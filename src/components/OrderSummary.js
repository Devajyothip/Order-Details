import React, { Component } from "react";
import Item from "./Item";

class OrderSummary extends Component {
  render() {
    // if (this.props.loading) {
    //   return <div>Loading</div>;
    // }

    return this.props.ordersOfCustomer.map((order) => (
      <div>
        {order.items.map((item) => (
          <Item
            key={item.id}
            closeMenu={this.props.closeMenu}
            item={item}
            orderId={order.orderId}
            handleOrderSelection={this.props.handleOrderSelection}
          />
        ))}
      </div>
    ));
  }
}

export default OrderSummary;
