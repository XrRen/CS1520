from flask import Flask, render_template, request, redirect, url_for, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from order_model import Base, Order  # Changed to a standard import for 'order_model'
import os
import time  # Import time to handle delays

app = Flask(__name__)

# Initialize database connection
order = create_engine('sqlite:///order.db', echo=True)

Base.metadata.create_all(order)

# Create a session
Session = sessionmaker(bind=order)
session = Session()

@app.route('/<int:table_number>', methods=['GET'])
def main_menu(table_number):
    # Render the main_menu.html page and pass the table number
    return render_template('main_menu.html', table_number=table_number)

@app.route('/order/<int:table_number>', methods=['POST'])
def order(table_number):
    customer_name = request.form.get('customer_name')
    order_summary = request.form.get('order_summary', '')

    itemized_order = order_summary.strip().split(os.linesep)

    # Create an Order object (JSON object)
    new_order = Order(
        customer_name=customer_name,
        table_number=table_number,
        orders=os.linesep.join(itemized_order)  # Save with `\r\n` separators
    )
    
    # Save the order to the database
    try:
        session.add(new_order)
        session.commit()

        print("Order saved to the database.")
        
        # Render order summary with automatic redirect to main menu after 15 seconds
        response = render_template('order_summary.html', order_data={
            'customer_name': customer_name,
            'table_number': table_number,
            'orders': itemized_order
        })

        
        return response

    except Exception as e:
        session.rollback()  # Rollback transaction on error
        return f"An error occurred: {e}", 500


@app.route('/kitchen/', methods=['GET'])
def kitchen():
    try:
        orders = session.query(Order).order_by(Order.date_created).all()
        json_orders = [
            {
                'id': order.id,
                'customer_name': order.customer_name,
                'table_number': order.table_number,
                'orders': order.orders.split(os.linesep),
                'date_created': order.date_created
            }
            for order in orders
        ]
        return render_template('kitchen.html', orders=json_orders)
    except Exception as e:
        session.rollback()  # Rollback the session in case of an error
        return "An error occurred while fetching orders."

@app.route('/delete_order/<int:order_id>', methods=['POST'])
def delete_order(order_id):
    try:
        # Fetch the order by ID
        order = session.query(Order).get(order_id)
        
        # If the order exists, delete it
        if order:
            session.delete(order)
            session.commit()
        return redirect(url_for('kitchen'))
    except Exception as e:
        session.rollback()
        return "An error occurred while deleting the order."


if __name__ == '__main__':
    app.run(debug=True)
