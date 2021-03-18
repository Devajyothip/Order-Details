import React, { Component } from "react";
import "../App.css";
import * as OrdersAPIAxios from "../OrdersAPIAxios";
import classnames from "classnames";
import moment from "moment";
import Button from "@material-ui/core/Button";

import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

class OrderDetails extends Component {
  state = {
    order: {},
    loading: true,
  };

  async componentDidMount() {
    const order = await OrdersAPIAxios.getOrderById(this.props.orderId);
    console.log(order.data);
    this.setState(() => ({
      order: order.data,
      loading: false,
    }));
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="order-details"
        >
          <div>Loading...</div>
        </div>
      );
    }

    const isOrdered = this.state.order.status === "ordered";
    const isShipped = this.state.order.status === "shipped";
    const isDelivered = this.state.order.status === "delivered";
    return (
      <div className="order-details">
        <h5 className="text-low-line-height">
          Heads up: The shipping date changed.
        </h5>
        <h5 className={classnames("text-grey", "text-low-line-height")}>
          Before we can complete your order, review the new date confirm if
          you're OK with it.
        </h5>
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <div
            className={classnames(
              "item-card-icons-conrainer",
              isDelivered ? "item-card-icons-conrainer-delivered" : ""
            )}
          >
            {!isDelivered && (
              <CheckCircleOutlineOutlinedIcon
                style={{
                  color: isOrdered || isShipped ? "orange" : "grey",
                  fontSize: 40,
                }}
              />
            )}
            {!isDelivered && (
              <LocalShippingOutlinedIcon
                style={{
                  color: isShipped ? "orange" : "grey",
                  fontSize: 40,
                }}
              />
            )}
            <HomeOutlinedIcon
              style={{ color: isDelivered ? "blue" : "grey", fontSize: 40 }}
            />
          </div>
          <div className="item-card-status-container">
            <div
              className={classnames(
                "item-card-status",
                isDelivered
                  ? "item-card-status-done"
                  : "item-card-status-active"
              )}
            ></div>
            <div
              className={classnames(
                "shipped-icon",
                "item-card-status",
                isDelivered
                  ? "item-card-status-done"
                  : isShipped
                  ? "item-card-status-active"
                  : "item-card-status-inactive"
              )}
            >
              <CloseRoundedIcon className="not-shipped-icon" />
            </div>
            <div
              className={classnames(
                "item-card-status",
                isDelivered
                  ? "item-card-status-done"
                  : "item-card-status-inactive"
              )}
            ></div>
          </div>
        </div>
        <h5>{`Items ordered: ${this.state.order.items.length}`}</h5>
        <div
          style={{
            display: "flex",
          }}
        >
          <WarningRoundedIcon
            style={{
              color: "orange",
              fontSize: 20,
            }}
          />
          <h5
            className="text-grey"
            style={{
              marginTop: 0,
              marginLeft: 5,
            }}
          >
            Don't forget to let us know if you accept the new ship date. We'll
            cancel your order if we don'y hear from you soon
          </h5>
        </div>

        <div>
          {this.state.order.items.map((itemFilter) =>
            this.state.order.items
              .filter(
                (item) =>
                  item.newEstimatedShipDateRange.fromDate ===
                  itemFilter.newEstimatedShipDateRange.fromDate
              )
              .map((item, index) => (
                <div>
                  {index === 0 && (
                    <div>
                      <h5
                        style={{ margin: 0, marginTop: 30 }}
                        className="text-low-line-height"
                      >
                        New estimated ship date:
                      </h5>
                      <h5
                        style={{ margin: 0 }}
                        className={classnames(
                          "text-grey",
                          "text-low-line-height"
                        )}
                      >{`${moment(
                        item.newEstimatedShipDateRange.fromDate
                      ).format("ddd., MMMM. YY")} - ${moment(
                        item.newEstimatedShipDateRange.toDate
                      ).format("ddd., MMMM. YY")}`}</h5>

                      <h6
                        style={{ margin: 0, marginTop: 30 }}
                        className={classnames(
                          "text-grey",
                          "text-low-line-height"
                        )}
                      >
                        Original estimated ship date:
                      </h6>
                      <h5
                        style={{ margin: 0 }}
                        className={classnames(
                          "text-grey",
                          "text-low-line-height"
                        )}
                      >{`${moment(item.estimatedShipDateRange.fromDate).format(
                        "ddd., MMMM. YY"
                      )} - ${moment(item.estimatedShipDateRange.toDate).format(
                        "ddd., MMMM. YY"
                      )}`}</h5>
                      <div style={{ display: "flex" }}>
                        <h5
                          style={{ marginRight: 5 }}
                          className="text-low-line-height"
                        >
                          Address:
                        </h5>
                        <h5
                          className={classnames(
                            "text-grey",
                            "text-low-line-height"
                          )}
                        >
                          {` ${this.state.order.shipingAddress.street}, ${this.state.order.shipingAddress.city}, ${this.state.order.shipingAddress.state}, ${this.state.order.shipingAddress.zip}`}
                        </h5>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Button
                          style={{ marginTop: 15 }}
                          variant="contained"
                          color="primary"
                        >
                          Accept new ship date
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ marginTop: 15, marginBottom: 30 }}
                        >
                          Cencel your order
                        </Button>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex" }}>
                    <div
                      key={item.id}
                      className="item-card-image"
                      style={{
                        width: 70,
                        height: 140,
                        backgroundImage: `url(${
                          item.image === undefined
                            ? "https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
                            : item.image
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                      }}
                    />
                    <div
                      style={{
                        marginLeft: 20,
                        marginTop: 0,
                      }}
                    >
                      <h3
                        style={{
                          marginTop: 10,
                        }}
                        className="text-low-line-height"
                      >
                        {item.name}
                      </h3>
                      <h5
                        className={classnames(
                          "text-grey",
                          "text-low-line-height"
                        )}
                      >{`Qunatity: ${item.quantity}`}</h5>
                      <h5
                        className={classnames(
                          "text-grey",
                          "text-low-line-height"
                        )}
                      >
                        {item.telephoneNumber}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    );
  }
}

export default OrderDetails;
