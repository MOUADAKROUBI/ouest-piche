import React from 'react'
import { fetchOrders } from '@/lib/fetchData'
import { formatDate } from '@/hooks/useFormatDate';

export default async function Orders() {
  const { orders } = await fetchOrders();

  return (
    <div className="content">
      <div className="content-commands">
        <div className="content-info">
          <div className="filters"></div>
          <div className="line"></div>
          <table className="commands">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Date</th>
                <th>Statut</th>
                <th>le type de payment</th>
                <th>méthode de paiement</th>
                <th>Total</th>
                <th>articles</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map( order => (
                  <tr
                    key={order._id}
                  >
                    <td>
                      {order._id}
                    </td>
                    <td>{formatDate(order._createdDate, false)}</td>
                    <td>{order.status}</td>
                    <td>{order.payments?.[0].type}</td>
                    <td>{order.payments?.[0].method}</td>
                    <td>{order.totals?.total}</td>
                    <td>{order.lineItems?.length}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
