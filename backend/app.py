from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://music-mood-weld.vercel.app"
        ]
    }
})

# ================= MONGODB CONNECTION =================
mongo_uri = os.environ.get("MONGO_URI", "mongodb+srv://vu241fa04c16:sri39393@cluster39.jeql8kc.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient(mongo_uri)

db = client["musicdb"]
users = db["users"]

# ================= HOME =================
@app.route("/")
def home():
    return jsonify({"message": "Backend Running Successfully"})


# ================= SIGNUP =================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # check if user already exists
    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    users.insert_one({
        "name": name,
        "email": email,
        "password": password
    })

    return jsonify({"message": "Signup Successful"})


# ================= LOGIN (FIXED) =================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 401

    if user["password"] != password:
        return jsonify({"message": "Wrong password"}), 401

    return jsonify({
        "message": "Login Successful",
        "name": user["name"]
    })


# ================= SONGS API (7 MOODS) =================
@app.route("/songs/<mood>", methods=["GET"])
def songs(mood):

    data = {
        "happy": [
{
"title": "Butta Bomma - Ala Vaikunthapurramuloo",
"url": "https://www.youtube.com/embed/YO7rue3nKX0"
},
{
"title": "Samajavaragamana - Ala Vaikunthapurramuloo",
"url": "https://www.youtube.com/embed/tflQ33g6I8I"
},
{
"title": "Inthandham - Sita Ramam",
"url": "https://www.youtube.com/embed/dOKQeqGNJwY"
}
],

"sad": [
{
"title": "Vellipomake - Saahasam Swaasaga Saagipo",
"url": "https://www.youtube.com/embed/-GydnFPTgus"
},
{
"title": "Priyathama Priyathama - Majili",
"url": "https://www.youtube.com/embed/BpINyS4k7Uw"
},
{
"title": "Yedhalo Oka Mounam - Shyam Singha Roy",
"url": "https://www.youtube.com/embed/yRwF8pSzFNo"
}
],

"angry": [
{
"title": "Fear Song - Devara",
"url": "https://www.youtube.com/embed/CKpbdCciELk"
},
{
"title": "Dandaalayyaa - Baahubali 2",
"url": "https://www.youtube.com/embed/ufiWBv9h8dU"
},
{
"title": "Bad Boy - Saaho",
"url": "https://www.youtube.com/embed/-wv0yyoGYLI"
}
],

"energetic": [
{
"title": "Naatu Naatu - RRR",
"url": "https://www.youtube.com/embed/4_eEgJhsBMo"
},
{
"title": "Blockbuster - Sarrainodu",
"url": "https://www.youtube.com/embed/MkaUB7iQaQ8"
},
{
"title": "Mind Block - Sarileru Neekevvaru",
"url": "https://www.youtube.com/embed/e4ExVtu7J8w"
}
],

"motivational": [
{
"title": "Salaam Rocky Bhai - KGF",
"url": "https://www.youtube.com/embed/1qyfqZ8zh4k"
},
{
"title": "Jai Balayya - Veera Simha Reddy",
"url": "https://www.youtube.com/embed/HgWgOii3SmQ"
},
{
"title": "Prathi Roju Pandage Title Song",
"url": "https://www.youtube.com/embed/bk5tW-6dFtc"
}
],

"love": [
{
"title": "Yenti Yenti - Geetha Govindam",
"url": "https://www.youtube.com/embed/LOZNKZfiFUw"
},
{
"title": "Inkem Inkem Kaavaale - Geetha Govindam",
"url": "https://www.youtube.com/embed/LPeZOE8ZIHI"
},
{
"title": "Arerey Manasa - Falaknuma Das",
"url": "https://www.youtube.com/embed/Qf4MumY9fXk"
}
],

"relaxed": [
{
"title": "Kanunna Kalyanam - Sita Ramam",
"url": "https://www.youtube.com/embed/jwY0wDCQt4s"
},
{
"title": "Madhurame - Arjun Reddy",
"url": "https://www.youtube.com/embed/YaZuEkCgctA"
},
{
"title": "Inthandham - Sita Ramam",
"url": "https://www.youtube.com/embed/dOKQeqGNJwY"
}
]

    }

    return jsonify(data.get(mood, []))


# ================= RUN SERVER =================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "False").lower() in ("1", "true", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug)