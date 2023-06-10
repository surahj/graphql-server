import ordersModel  from './orders.model';

module.exports = {
  Query: {
    orders: () => {
      return ordersModel.getAllOrders();
    }
  }
};