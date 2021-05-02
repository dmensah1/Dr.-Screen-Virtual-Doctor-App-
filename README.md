# RU Hacks 2021 - Bedford Lions

## Dr. Screen

![image](https://user-images.githubusercontent.com/46732681/116830553-0ba9c500-ab79-11eb-90fa-785789246aff.png)

This project was built for RU Hacks 2021. See more information [here](https://devpost.com/software/dr-screen)

## Who We Are

We are a group of university students from Dalhousie University, Western University and University of Toronto. 

## Table of Contents

1. [Local Deployment](#local_deployment)


<a name="local_deployment"></>
## Steps for Local Deployment
- `git clone https://github.com/dmensah1/ruhacks-bedfordlions.git`
- In terminal 1
  - `cd backend`
  - `npm install`
  - `npm start`
- In terminal 2
  - `cd frontend`
  - `npm install`
  - `npm start`
- The application is now accessible at `http://localhost:3000` 

 
## Inspiration

The COVID-19 pandemic has vastly changed the way we approached our day-to-day tasks. Doctors are no exception. Due to lockdowns and various restrictions, they have been forced to move to a virtual environment. Furthermore, in Nova Scotia, where our team members are from, it was particularly difficult to schedule appointments due to longer than anticipated turn-around times. This led to non-urgent inquiries being pushed back and at times forgotten.

Dr. Screen was built as a supplementary tool to streamline family practitioners' jobs. Its goal is to reduce the amount of time that a practitioner would need to spend with patients for less serious inquiries such as diagnosis of patient conditions as well as prescription renewals. By streamlining simpler inquiries that require visits to the doctor, a doctor is able to help a greater number of patients throughout a day.


## What it does

The main feature of our app is an integrated machine learning model that generates confidence probabilities of diseases given the symptoms provided. This was achieved by training a model on the top 20 most common symptoms and top 40 most common diseases. Patients would provide a list of symptoms and this would be processed by the ML model. The ML model would then provide the most likely diseases to the doctor. Through this, doctors would be able to have an idea of what the patient is feeling. This allows doctors to reduce uncertainties and thus make more well-informed decisions.

The other main feature of our app is an appointment scheduler that allows patients to schedule appointments for the doctor’s available time slots. While scheduling their appointment, the user is prompted to input symptoms that they are experiencing, as well as leave an extra note for the doctor. Upon the submission of the schedule appointment form, we run the patient symptoms through our Tensorflow machine learning model to obtain the five possible diagnoses that have the highest confidence percentages based on the inputted patient symptoms. We then present the patients symptoms, their possible diagnoses, and their confidence intervals to the doctor who can view this information prior to the appointment. This allows the doctor to head into an appointment already having an idea of why the patient is there and the possible diagnoses - saving time spent on performing the full diagnoses during the appointment itself.

The other big feature of our app is the ability of a patient to request prescription refills without the need to schedule an appointment with their doctor. Our safe mechanism of doing this starts by allowing the doctor to maintain each patient's prescriptions as well as their prescription history of past refills. The patient is able to hit a button to request a refill, which then notifies the doctor of this request. Upon being notified of a prescription request, the doctor is able to decline or approve the patient's request by going over the patient's last refill request which has information such as the doses given and the duration of the refill. This allows the doctor to make an informed and safe decision when giving out prescription refills.

Lastly, our app allows the doctors to schedule follow-ups with their patients to keep up to date on their condition. These follow-ups can be recurring or a one-time thing after the patient and doctor's appointments to allow the doctor to get a sense of the patient's progress. The doctor can also request the patient to upload pictures to the app to get visuals of the patient's condition if this is something that is required with the patient’s condition. If the doctor sees that the patient is not improving, the doctor can notify the patient to meet with him again.


## How we built it

We built Dr. Screen using React, Express, Node.js, and Firebase. We chose to use Firebase for our database due to prior experience amongst team members and also for its easy to integrate user authentication mechanism as well as individual functions we could deploy to serve specific purposes such as image uploads to the cloud. Our machine learning model used to predict possible illnesses based on patient symptoms was built using Tensorflow. Furthermore, we used numerous node packages such as React Material UI for specific features found on the application.

For our model we used an MLP neural network trained on a dataset from Kaggle linking symptoms to diseases. We treat it as a multiclass-classification task such that the model outputs probabilities for each disease. Based on a simple selection of the highest probability disease, we were able to achieve 87.4% accuracy on a held out test set.

## Screenshots

![doctor_followups](https://user-images.githubusercontent.com/39662044/116831822-17e94e80-ab88-11eb-9644-bec7e4765596.png)
![doctor_home](https://user-images.githubusercontent.com/39662044/116831823-1881e500-ab88-11eb-940b-d9fa01c939ae.png)
![doctor_home_appt_details](https://user-images.githubusercontent.com/39662044/116831824-1881e500-ab88-11eb-9e1c-59de90365164.png)
![doctors_patients](https://user-images.githubusercontent.com/39662044/116831825-1881e500-ab88-11eb-8080-e10b7c11d306.png)
![login](https://user-images.githubusercontent.com/39662044/116831826-1881e500-ab88-11eb-8c01-1572a14e8dda.png)
![patient_appt_details](https://user-images.githubusercontent.com/39662044/116831827-191a7b80-ab88-11eb-80da-4ff079a74556.png)
![patient_appt_note](https://user-images.githubusercontent.com/39662044/116831828-191a7b80-ab88-11eb-9ca6-225d01b839cf.png)
![patient_appt_symptoms](https://user-images.githubusercontent.com/39662044/116831829-191a7b80-ab88-11eb-82a8-65d4b3a51555.png)
![patient_appt_times](https://user-images.githubusercontent.com/39662044/116831831-191a7b80-ab88-11eb-9c11-af02710b8f97.png)
![patient_followup_details](https://user-images.githubusercontent.com/39662044/116831833-19b31200-ab88-11eb-9a38-78bbd87c551d.png)
![patient_home](https://user-images.githubusercontent.com/39662044/116831834-19b31200-ab88-11eb-80a4-4206e7f9d9f7.png)
![patient_prescriptions](https://user-images.githubusercontent.com/39662044/116831835-19b31200-ab88-11eb-84c9-d9d10311e7de.png)
![patient_schedule_appt](https://user-images.githubusercontent.com/39662044/116831836-19b31200-ab88-11eb-9ef2-5e88a378ccd9.png)

