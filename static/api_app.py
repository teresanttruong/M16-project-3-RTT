#Import dependencies
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy 
from flask import Flask
import os.path


#Database Setup
engine = create_engine("sqlite:///data/restaurants.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
# Save references to each table
# Restaurants = Base.classes.restaurants
# Create our session (link) from Python to the DB
session = Session(engine)


#Flask Setup
db = SQLAlchemy()

app = Flask(__name__)

db_name = "C:/Users/victo/Documents/Bootcamp/Week16/M16-project-3-RTT/data/restaurants.sqlite"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, db_name)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

#Create class for restaurants table
class Restaurants(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.String, primary_key=True)
    dataAdded = db.Column(db.String)
    dateUpdated = db.Column(db.String)
    address = db.Column(db.String)
    categories = db.Column(db.String)
    primaryCategories = db.Column(db.String)
    city = db.Column(db.String)
    country = db.Column(db.String)
    keys = db.Column(db.String)
    latitude = db.Column(db.String)
    longitude = db.Column(db.String)
    name = db.Column(db.String)
    postalCode = db.Column(db.String)
    province = db.Column(db.String)
    sourceURLs = db.Column(db.String)
    websites = db.Column(db.String)


#Flask Routes
@app.route("/")
def welcome():
    return (
        f"Welcome to the US Fast Food Restaurants API!<br/>"
        f"Available routes:<br/>"
        f"/map<br/>"
        f"/data<br/>"
    )
    
# @app.route("/map")
# def map():
    
@app.route("/data")
#Display restaurants database, creating a bullet point for each restaurant
#see restaurant_index.html for formatting of table
def data():
    try:
        restaurants = Restaurants.query.all()
        restaurants_text = '<ul>'
        for restaurant in restaurants:
            restaurants_text += '<li>' + restaurant.id + ', ' + restaurant.dataAdded + ', ' + restaurant.dateUpdated + ', ' + restaurant.address + ', ' + restaurant.categories + ', ' + restaurant.primaryCategories + ', ' + restaurant.city + ', ' + restaurant.country + ', ' + restaurant.keys + ', ' + restaurant.latitude + ', ' + restaurant.longitude + ', ' + restaurant.name + ', ' + restaurant.postalCode + ', ' + restaurant.province + ', ' + restaurant.sourceURLs + ', ' + restaurant.websites + '</li>'
        restaurants_text += '</ul>'
        return restaurants_text
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
    
    
#Run app
if __name__ == '__main__':
    app.run()