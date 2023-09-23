# Import dependencies
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy 
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import os.path
import sqlite3
from flask import Flask
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///data/restaurants.sqlite")


# Reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Create our session (link) from Python to the DB
session = Session(engine)



#Flask Setup
db = SQLAlchemy()
app = Flask(__name__)
CORS(app)

db_name = "data/restaurants.sqlite"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, db_name)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# Initialize the app with Flask-SQLAlchemy
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

    def as_dict(self):
        return {
            'id': self.id,
            'dataAdded': self.dataAdded,
            'dateUpdated': self.dateUpdated,
            'address': self.address,
            'categories': self.categories,
            'primaryCategories': self.primaryCategories,
            'city': self.city,
            'country': self.country,
            'keys': self.keys,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'name': self.name,
            'postalCode': self.postalCode,
            'province': self.province,
            'sourceURLs': self.sourceURLs,
            'websites': self.websites
        }

#Flask Routes
@app.route("/")
def welcome():
    return (
        f"Welcome to the US Fast Food Restaurants API!<br/>"
        f"Available routes:<br/>"
        f"/map<br/>"
        f"/graphs<br/>"
        f"/data_table<br/>"
        f"/get_data<br/>"
    ) 

@app.route("/map")
def map():
    return render_template('restaurant_map_index.html')

@app.route("/graphs")
def graphs():
    return render_template('restaurant_graphs_index.html')

@app.route("/data_table")
# Display restaurants database, creating a bullet point for each restaurant
# See restaurant_index.html for formatting of table
def data():
    restaurants = Restaurants.query.all()
    return render_template('restaurant_data_index.html', restaurants=restaurants)

@app.route("/get_data")
def get_data():
    restaurants = Restaurants.query.all()
    serialized_data = [restaurant.as_dict() for restaurant in restaurants]
    return jsonify(Restaurant=serialized_data)
  
#Run app
if __name__ == '__main__':
    app.run()