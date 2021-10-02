interface OrderStatus {
  id: number,
  key: string,
  orderSources: {
    [key: string]: string
  }
}

/**
 * This is the definition of order statuses in our system
 * @property key {string} is mainly used for translation purposes
 * @property id {number} is the id of order status in Oxion systems
 * @property orderSources {object} this is the golden source for keeping
 * order source specific statuses. This can be extended easily and keeping it
 * that way will help us to scale and manage easily. Also those keys can be used
 * if we want to show integration specific translation. or show a hint
 */
const orderStatuses: OrderStatus[] = [
  {
    id: 0,
    key: 'draft',
    orderSources: {
      ProStock: 'draft',
      TicimaxWeb: '0'
    }
  },
  {
    id: 1,
    key: 'pending',
    orderSources: {
      ProStock: 'pending',
      TicimaxWeb: '1',
      WooCommerce: 'pending'
    }
  },
  {
    id: 2,
    key: 'confirmed',
    orderSources: {
      ProStock: 'confirmed',
      TicimaxWeb: '2'
    }
  },
  {
    id: 3,
    key: 'waitingPayment',
    orderSources: {
      ProStock: 'waitingPayment',
      TicimaxWeb: '3'
    }
  },
  {
    id: 4,
    key: 'processing',
    orderSources: {
      ProStock: 'processing',
      TicimaxWeb: '4',
      WooCommerce: 'processing'
    }
  },
  {
    id: 5,
    key: 'waitingSupplier',
    orderSources: {
      ProStock: 'waitingSupplier',
      TicimaxWeb: '5'
    }
  },
  {
    id: 6,
    key: 'shipped',
    orderSources: {
      ProStock: 'shipped',
      TicimaxWeb: '6'
    }
  },
  {
    id: 7,
    key: 'completed',
    orderSources: {
      ProStock: 'completed',
      TicimaxWeb: '7',
      WooCommerce: 'completed'
    }
  },
  {
    id: 8,
    key: 'cancelled',
    orderSources: {
      ProStock: 'cancelled',
      WooCommerce: 'cancelled',
      TicimaxWeb: '8'
    }
  },
  {
    id: 9,
    key: 'returned',
    orderSources: {
      ProStock: 'returned',
      WooCommerce: 'refunded',
      TicimaxWeb: '9'
    }
  },
  {
    id: 10,
    key: 'deleted',
    orderSources: {
      ProStock: 'deleted',
      WooCommerce: 'trash',
      TicimaxWeb: '10'
    }
  },
  {
    id: 11,
    key: 'returnRequestReceived',
    orderSources: {
      TicimaxWeb: '11'
    }
  },
  {
    id: 12,
    key: 'returnArrivedWaitingPayment',
    orderSources: {
      TicimaxWeb: '12'
    }
  },
  {
    id: 13,
    key: 'returnPaymentCompleted',
    orderSources: {
      TicimaxWeb: '13'
    }
  },
  {
    id: 14,
    key: 'cancelRequestBeforeDelivery',
    orderSources: {
      TicimaxWeb: '14'
    }
  },
  {
    id: 15,
    key: 'cancelRequest',
    orderSources: {
      TicimaxWeb: '15'
    }
  },
  {
    id: 16,
    key: 'partialReturnRequest',
    orderSources: {
      TicimaxWeb: '16'
    }
  },
  {
    id: 17,
    key: 'partialReturnCompleted',
    orderSources: {
      TicimaxWeb: '17'
    }
  },
  {
    id: 18,
    key: 'cannotDelivered',
    orderSources: {
      TicimaxWeb: '18'
    }
  },
  {
    id: 19,
    key: 'onHold',
    orderSources: {
      WooCommerce: 'on-hold',
      ProStock: 'onHold'
    }
  },
  {
    id: 20,
    key: 'failed',
    orderSources: {
      ProStock: 'failed',
      WooCommerce: 'failed'
    }
  }
];


/**
 * This function helps us to find the equivalent id of order status in our systems
 * given by using the order status at original order source
 *
 * @example
 * Scenario: We are fetching orders from WooCommerce and inside the order we fetched
 * we get orderStatus as 'failed' and we want to know what failed means in our systems
 *
 * we call this function like this;
 *
 * getOrderStatusFromStatusAtOrderSource('WooCommerce', 'failed');
 *
 * this function will return us the id of status in our system,
 * in this example it will return 20
 *
 * @param {string} orderSource
 * @param {string} statusAtOrderSource
 * @return {number}
 */
const getOrderStatusFromStatusAtOrderSource = (orderSource: string, statusAtOrderSource: string) => {
  const orderStatus = orderStatuses.find(x => x.orderSources[orderSource] && x.orderSources[orderSource] === statusAtOrderSource);
  if(orderStatus) {
    return orderStatus.id
  } else {
    throw Error(`Order status ${statusAtOrderSource} is not implemented for order source ${orderSource} in Oxion systems`)
  }
}

/**
 * This function help us to convert an Oxion Order status to the original status
 * in given order source
 *
 * getStatusAtOrderSourceFromOrderSource('WooCommerce', 20');
 *
 * this function will return us the id of status in order source,
 * in this example it will return 'failed'
 *
 * @param orderSource
 * @param statusAtOxionSystems
 */
const getStatusAtOrderSourceFromOrderSource = (orderSource: string, statusAtOxionSystems: number) => {
  const orderStatus = orderStatuses.find(x => x.id === statusAtOxionSystems);
  if(orderStatus) {
    if(orderStatus[orderSource]) {
      return orderStatus[orderSource]
    } else {
      throw new Error()
    }
  } else {
    throw Error(`Couldn't find the given order status ${statusAtOxionSystems} in our systems`)
  }
}


export default {
  orderStatuses,
  getOrderStatusFromStatusAtOrderSource,
  getStatusAtOrderSourceFromOrderSource
}


