FROM python:3.10-slim-buster

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# Set environment variables for Flask
# entry point
ENV FLASK_APP=app.py   

# Flask environment to development
ENV FLASK_ENV=development

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
