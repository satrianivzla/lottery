
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type Raffle = {
  id: number;
  name: string;
  description: string | null;
  totalTickets: number;
}

export default function RafflePage() {
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const params = useParams()
  const { id } = params

  useEffect(() => {
    console.log('RafflePage component mounted')
    if (id) {
      async function fetchRaffle() {
        console.log(`Fetching raffle with id: ${id}`)
        const res = await fetch(`/api/raffles/${id}`)
        if (res.ok) {
          const data = await res.json()
          console.log('Raffle data:', data)
          setRaffle(data)
        }
      }
      fetchRaffle()
    }
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!paymentProof) {
      setError('Please upload a payment proof screenshot.')
      return
    }

    // 1. Upload the image
    const formData = new FormData()
    formData.append('file', paymentProof)
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      setError('Failed to upload payment proof.')
      return
    }

    const uploadData = await uploadResponse.json()
    const paymentProofUrl = uploadData.path

    // 2. Create the purchase
    const purchaseResponse = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raffleId: raffle?.id,
        customerName,
        customerPhone,
        customerEmail,
        ticketQuantity,
        paymentProofUrl,
      }),
    })

    if (purchaseResponse.ok) {
      setSuccess('Your purchase has been submitted for review.')
    } else {
      const errorData = await purchaseResponse.json()
      setError(errorData.error)
    }
  }

  console.log('Rendering RafflePage component. Raffle state:', raffle)

  if (!raffle) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>{raffle.name}</h4>
            </div>
            <div className="card-body">
              <p>{raffle.description}</p>
              <p>Total Tickets: {raffle.totalTickets}</p>
              <hr />
              <h5>Purchase Tickets</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Ticket Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Payment Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
