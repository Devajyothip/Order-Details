import React, { Component } from "react";
import { Link } from "react-router-dom";

import MoveToInboxOutlinedIcon from "@material-ui/icons/MoveToInboxOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import moment from "moment";
import classnames from "classnames";

import "../App.css";

class Item extends Component {
  render() {
    const image =
      this.props.item.image === undefined
        ? "https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
        : this.props.item.image;

    const itemStatus =
      this.props.item.status === "delivered" ? "Arrived:" : "Expected to ship:";

    const shipmentDate = this.props.item.estimatedShipDateRange.fromDate;
    const shipmentDateFromated = moment(shipmentDate).format("MMMM DD, YYYY");

    const isOrdered = this.props.item.status === "ordered";
    const isShipped = this.props.item.status === "shipped";
    const isDelivered = this.props.item.status === "delivered";

    return (
      <Link
        className="item-card-link"
        to="/order-details"
        onClick={() => {
          this.props.closeMenu();
          this.props.handleOrderSelection(this.props.orderId);
        }}
      >
        <div className="item-card">
          <div
            className="item-card-image"
            style={{
              width: 128,
              height: 250,
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="item-card-details">
            <div>
              <div
                className={classnames(
                  "item-card-icons-conrainer",
                  isDelivered ? "item-card-icons-conrainer-delivered" : ""
                )}
              >
                {!isDelivered && (
                  <MoveToInboxOutlinedIcon
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
                    "item-card-status",
                    isDelivered
                      ? "item-card-status-done"
                      : isShipped
                      ? "item-card-status-active"
                      : "item-card-status-inactive"
                  )}
                ></div>
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
            <h5>{`${itemStatus} ${shipmentDateFromated}`}</h5>
            <h2>{this.props.item.name}</h2>
            <h5>{`${this.props.item.skuAttributes.color} ${this.props.item.skuAttributes.size}`}</h5>
            <h5>{this.props.item.telephoneNumber}</h5>
            <h5>{this.props.item.plan}</h5>
          </div>
        </div>
      </Link>
    );
  }
}

export default Item;
