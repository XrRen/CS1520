from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template('main_page.html')

@app.route('/christmas_story/')
def christmas_story():
    image_url = url_for('static', filename='images/christmas_story_enlarged.jpeg')  # Corrected path
    return render_template('christmas_story.html', image_url=image_url)

@app.route("/buy_tickets/<play_name>")
def buy_tickets(play_name):
    return render_template("buy_tickets.html", play_name=play_name)

# Route to show the Order Summary
@app.route("/order_summary/<play_name>")
def order_summary(play_name):
    # Collect all parameters from request args
    ticket_data = {
        "play_name": play_name,
        "customer_name": request.args.get("customer_name"),
        "date_and_time": request.args.get("date_and_time"),
        "zone": request.args.get("zone"),
        "sector": request.args.get("sector"),
        "ticket_price": "$100.00"  # Example price
    }

    return render_template("order_summary.html", ticket_data=ticket_data)

if __name__ == '__main__':
    app.run(debug=True)
