# Rule Engine Application


This project is a simple 3-tier rule engine designed to dynamically evaluate user eligibility based on attributes like age, department, income, spend, etc. The application uses an Abstract Syntax Tree (AST) to represent conditional rules, allowing for flexible rule creation, modification, and evaluation.



# Overview
The system is divided into three main components:
- **Frontend (UI)**: A simple interface where users can define rules and attributes.
- **API Layer**: Handles rule creation, combination, and evaluation using AST.
- **Backend (Data Storage)**: Utilizes MongoDB to store rules and application metadata efficiently.

## Data Structure
- Define a data structure to represent the AST.
- The data structure should allow rule changes.
- For example, one data structure could be a `Node` with the following fields:
  - `type`: String indicating the node type ("operator" for AND/OR, "operand" for conditions).
  - `left`: Reference to another Node (left child).
  - `right`: Reference to another Node (right child for operators).
  - `value`: Optional value for operand nodes (e.g., number for comparisons).


## Features
- **Create Rules**: Enter strings in a simple format to convert them into rules.
- **Evaluate Rules**: Easily evaluate rules by entering them in a simple format.
- **Combine Rules**: Combine multiple rules using logical operators such as AND and OR.
- **Get All Rules**: Retrieve all the rules stored in the system.
- **Modify Rules**: Dynamically manage your rules by adding, editing, or removing them as needed.

## Requirements
- React (for the frontend)
- Flask (for the backend)
- MongoDB (for data storage)


## Installation
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd AST/frontend
   ```
2. Install the required packages:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd AST/backend
   ```
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Ensure MongoDB is running on your local machine.
4. Start the backend application (assuming you have a Flask app):
   ```bash
   python app.py
   ```

## Configuration
- Update the `MONGO_DATABASE_URI` in `config.py` if your MongoDB instance is not running on the default port or if you are using a different database.

## Usage
1. Access the application in your web browser at `http://localhost:3000`.
2. Use the navigation bar to access different functionalities such as creating rules, evaluating them, and managing existing rules.

## API Endpoints
- `POST /api/rules/create_rule` - Create a new rule.
- `POST /api/rules/evaluate_rule` - Evaluate a rule.
- `POST /api/rules/combine_rules` - Combine multiple rules.
- `GET /api/rules` - Retrieve all rules.
- `PUT /api/rules/update_rule` - Update an existing rule.



# Test Cases
- Create Rules: Use create_rule to create ASTs for each sample rule and verify their structure.

- Combine Rules: Use combine_rules to combine multiple rules and ensure the AST reflects the combined logic.

- Evaluate Rules: Test evaluate_rule with various sets of user data to verify the correct application of the rules.


# Bonus Features
- Error Handling: Graceful handling of invalid inputs, unsupported operators, and missing data fields.
- Rule Modifications: Rules can be modified post-creation using helper functions to update conditions or operators.
- User-defined Functions: Extend the system to support custom functions within the rule language for advanced use cases.
