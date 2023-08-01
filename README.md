# Job Portal for HR Executives

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This is a comprehensive web-based job portal designed specifically for HR executives (admins) to streamline the job application process. With this portal, HR executives can easily create and manage job listings, add custom questions to each job, review candidate applications, and shortlist potential candidates.

## Key Features

- HR executives can create new job listings with detailed descriptions and requirements.
- Customizable application forms with the ability to add specific questions for candidates.
- Secure user authentication and authorization to ensure access control.
- Candidates can view job listings and submit their applications online.
- HR executives can review candidate applications and shortlist candidates for further consideration.
- Email notifications to keep candidates informed about the status of their applications.
- User-friendly admin panel for easy job and application management.

## Tech Stack

- Back-end: Node.js, Express.js
- Database: MongoDB
- API: RESTAPI
- Authentication: JSON Web Tokens (JWT)

## How to Contribute

We welcome contributions to improve the job portal and add new features. If you'd like to contribute, follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the code follows our coding guidelines.
3. Write unit tests to cover your changes.
4. Submit a pull request, and our team will review your contribution.

## Installation and Setup
 **Clone the repository:**
 git clone https://github.com/kamesh666/job_portal.git
cd job_portal

**Install dependencies:**
npm install

 **Set up environment variables (if required):**
If the project requires environment variables, create a `.env` file in the root directory and add the necessary variables. You can find the required variables in the `.env.example` file.

 **Start the application:**
 npm start

 **View the application:**
Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

# HR Executive Job Portal Database Design

## Entities and Relationships

1. **Jobs Table:**

   | Field         | Data Type | Description                          |
   |---------------|-----------|--------------------------------------|
   | JobId         | Integer   | Primary Key                          |
   | Title         | String    | Title of the job                     |
   | Subtitle      | String    | Subtitle or description of the job   |
   | DateOfCreation| Date      | Date when the job was created        |
   | IsActive      | Boolean   | Indicates if the job is active       |
   | LastDate      | Date      | Last date for applying to the job    |
   | TotalCandidates | Integer | Total number of candidates applied   |
   | AddedBy       | Integer   | Foreign Key to Admins table          |

2. **Questions Table:**

   | Field         | Data Type | Description                               |
   |---------------|-----------|-------------------------------------------|
   | QuestionId    | Integer   | Primary Key                               |
   | QuestionTitle | String    | Title of the question                     |
   | Subtitle      | String    | Subtitle or additional info for the question |
   | AnswerType    | String    | Type of answer (e.g., text, dropdown, etc.)   |
   | IsMandatory   | Boolean   | Indicates if the question is mandatory  |
   | DropdownOptions | JSON Array or separate table | Options for dropdown questions |
   | Max           | Numeric   | Maximum value for numeric validations    |
   | Min           | Numeric   | Minimum value for numeric validations    |
   | Validation    | String    | Additional validation rules for answers  |
   | JobId         | Integer   | Foreign Key to Jobs table                 |

3. **Candidates Table:**

   | Field         | Data Type | Description                               |
   |---------------|-----------|-------------------------------------------|
   | CandidateId   | Integer   | Primary Key                               |
   | Name          | String    | Candidate's name                          |
   | Age           | Integer   | Candidate's age                           |
   | DateOfSubmission | Date   | Date when the candidate applied           |
   | JobId         | Integer   | Foreign Key to Jobs table                 |

4. **Admins Table:**

   | Field         | Data Type | Description                               |
   |---------------|-----------|-------------------------------------------|
   | AdminId       | Integer   | Primary Key                               |
   | Name          | String    | Admin's name                              |
   | Email         | String    | Admin's email                             |
   | Password      | String    | Admin's password                          |

## Description

This database design represents the schema for an HR Executive Job Portal. The portal allows HR executives to create and manage job listings, add custom questions to jobs, view candidate applications, and more.

## API ENDPOINTS

## Admin API Endpoint

Below are the API endpoints to handle admin-related actions in the HR Executive Job Portal:

- **POST /api/admin/signin**: Sign in an admin with credentials.
- **GET /api/admin/jobs**: Get all jobs created by the admin.
- **POST /api/admin/jobs**: Add a new job listing.
- **PUT /api/admin/jobs/:jobId**: Update an existing job listing.
- **DELETE /api/admin/jobs/:jobId**: Delete a job listing.
## Question API Endpoint

Below are the API endpoints to handle questions in the HR Executive Job Portal:

- **GET /api/questions/:jobId**: Get all questions for a specific job.
- **GET /api/questions/jobId/:jobId**: Get all candidates given jobID.
- **POST /api/questions/:jobId**: Add a new question to a job.
- **PUT /api/questions/:questionId**: Update a single question.
- **DELETE /api/questions/:questionId**: Delete a single question.
