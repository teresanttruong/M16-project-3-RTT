#Import dependencies
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy 
from flask import Flask, render_template
from flask_cors import CORS
import os.path


#Database Setup
engine = create_engine("sqlite:///data/restaurants.sqlite")


# reflect an existing database into a new model
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
#     markers = []
#     return render_template('restaurant_map_index.html', markers=markers)
    
#Display restaurants database
#see restaurant_index.html for formatting of table   
@app.route("/data")
def data():
    restaurants = Restaurants.query.all()
    return render_template('restaurant_data_index.html', restaurants=restaurants)   


#Run app
if __name__ == '__main__':
    app.run()