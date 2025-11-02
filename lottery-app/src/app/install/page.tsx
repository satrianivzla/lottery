
'use client'

import { useState } from 'react'

export default function InstallPage() {
  const [dbHost, setDbHost] = useState('localhost')
  const [dbPort, setDbPort] = useState('3306')
  const [dbUser, setDbUser] = useState('root')
  const [dbPassword, setDbPassword] = useState('')
  const [dbName, setDbName] = useState('lottery')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const response = await fetch('/api/install', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dbHost,
        dbPort,
        dbUser,
        dbPassword,
        dbName,
        adminEmail,
        adminPassword,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      setSuccess(data.message)
    } else {
      setError(data.error)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Installation Wizard</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <h5>Database Configuration</h5>
                <hr />
                <div className="form-group">
                  <label>Host</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dbHost}
                    onChange={(e) => setDbHost(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Port</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dbPort}
                    onChange={(e) => setDbPort(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>User</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dbUser}
                    onChange={(e) => setDbUser(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={dbPassword}
                    onChange={(e) => setDbPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Database Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    required
                  />
                </div>

                <h5 className="mt-4">Admin User</h5>
                <hr />
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Install
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
