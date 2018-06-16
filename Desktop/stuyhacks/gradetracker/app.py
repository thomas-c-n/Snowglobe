from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
	msg = 'hello'
	return render_template('index.html', msg = msg)

app.run(debug = True)