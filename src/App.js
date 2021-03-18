import React from "react";
import "./App.css";
import NavigationBar from "./components/Navigationbar";
import Home from "./pages/Home";
import OrderDetails from "./pages/OrderDetails";
import { Route } from "react-router-dom";
import * as OrdersAPIAxios from "./OrdersAPIAxios";

class App extends React.Component {
  state = {
    ordersOfCustomer: [],
    loading: true,
    selectedOrderId: 0,
  };

  async componentDidMount() {
    const ordersOfCustomer = await OrdersAPIAxios.getOrdersByCustomer(1, 1);
    console.log(ordersOfCustomer.data);
    this.setState(() => ({
      ordersOfCustomer: ordersOfCustomer.data,
      loading: false,
    }));
  }

  handleOrderSelection = (orderId) => {
    this.setState(() => ({
      selectedOrderId: orderId,
    }));
  };

  render() {
    return (
      <div>
        <NavigationBar
          ordersOfCustomer={this.state.ordersOfCustomer}
          handleOrderSelection={this.handleOrderSelection}
        />
        <Route path="/home" component={Home} />
        <Route
          path="/order-details"
          orderId={this.state.selectedOrderId}
          render={() => <OrderDetails orderId={this.state.selectedOrderId} />}
        />
      </div>
    );
  }
}

export default App;
