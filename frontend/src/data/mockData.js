export const mockEmails = [
  {
    id: '1',
    sender: 'Netflix <info@netflix.com>',
    subject: 'Your Netflix subscription is about to expire',
    content: '<div><h2>Your Netflix subscription</h2><p>Dear customer, your Netflix subscription is about to expire. Please renew it to continue enjoying our service.</p><a href="#">Renew Now</a></div>',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '2',
    sender: 'Amazon <no-reply@amazon.com>',
    subject: 'Your Amazon order has been shipped',
    content: '<div><h2>Order Confirmation</h2><p>Your recent order #A123456 has been shipped and is on its way to you.</p><p>Expected delivery: Tomorrow</p></div>',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  },
  {
    id: '3',
    sender: 'LinkedIn <notifications@linkedin.com>',
    subject: 'You have 5 new connection requests',
    content: '<div><h2>New Connection Requests</h2><p>You have 5 new connection requests waiting for your response on LinkedIn.</p><a href="#">View Requests</a></div>',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    read: false
  },
  {
    id: '4',
    sender: 'Twitter <info@twitter.com>',
    subject: 'Security alert: new login to your account',
    content: '<div><h2>Security Alert</h2><p>We detected a new login to your Twitter account from a new device. If this was you, you can ignore this message.</p><a href="#">Review Login</a></div>',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false
  },
  {
    id: '5',
    sender: 'Spotify <no-reply@spotify.com>',
    subject: 'Your weekly playlist is ready',
    content: '<div><h2>Your Weekly Mix</h2><p>We\'ve curated a new playlist based on your listening habits. Check it out now!</p><a href="#">Listen Now</a></div>',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true
  }
]