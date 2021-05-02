import axios from 'axios';
import * as React from 'react';
import { FollowUp } from '../../interfaces/Interface';

type FollowUpModalProps = {
  followUp: FollowUp
};

const URL = 'https://us-central1-ruhacks-bedfordlions.cloudfunctions.net/storeImage';

export default function FollowUpModal({ followUp }: FollowUpModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const image = e.target.files
    if (image) {
      setFile(image[0])
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const base: string = await toBase64(file)
    const clean = base.replace('data:image/jpeg;base64,', '')
    const blob = base64toBlob(clean, '')
    console.log(blob)

    const res = await axios.post(URL, blob)
    console.log(res)

  }

  const toBase64: (image: any) => Promise<string> = (image: any) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(image)
  })

  function base64toBlob(base64Data: any, contentType: any) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  return (
    <>
      <button
        className="bg-indigo-400 rounded-md w-60 text-white active:bg-pink-600 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Follow Up
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Follow Up
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row min-w-full">
                  <div className="w-3/12 text-blueGray-500 text-lg leading-relaxed text-right font-bold p-1">
                    <p>
                      Note
                    </p>
                    <p>
                      Add Images
                    </p>
                  </div>
                  <div className="w-9/12 p-1 text-blueGray-500 text-lg leading-relaxed">
                    <p>
                      {followUp.note}
                    </p>
                    <form onSubmit={handleSubmit}>
                      <input type='file' accept='image/*' onChange={handleChange} />
                      <button type='submit'>Upload</button>
                    </form>

                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}