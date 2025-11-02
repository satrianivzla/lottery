
'use client'

import { useState, useEffect } from 'react'

type Raffle = {
  id: number;
  name: string;
  description: string | null;
  totalTickets: number;
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])

  useEffect(() => {
    async function fetchRaffles() {
      const res = await fetch('/api/raffles')
      const data = await res.json()
      setRaffles(data)
    }
    fetchRaffles()
  }, [])

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Raffles</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Total Tickets</th>
                </tr>
              </thead>
              <tbody>
                {raffles.map((raffle) => (
                  <tr key={raffle.id}>
                    <td>{raffle.id}</td>
                    <td>{raffle.name}</td>
                    <td>{raffle.description}</td>
                    <td>{raffle.totalTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
