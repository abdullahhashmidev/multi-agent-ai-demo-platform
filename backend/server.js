require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const customerSupport = require('./agents/demo1_customer_support');
const realEstate = require('./agents/demo2_real_estate');
const ecommerce = require('./agents/demo3_ecommerce');
const socialMedia = require('./agents/demo4_social_media');
const jobRecruitment = require('./agents/demo5_job_recruitment');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Multi-Agent Demo API',
    agents: ['customer-support', 'real-estate', 'ecommerce', 'social-media', 'job-recruitment'],
    timestamp: new Date().toISOString()
  });
});

// Demo 1 — Customer Support
app.get('/api/demo1/health', (req, res) => res.json({ ok: true, demo: 'Customer Support Agent' }));
app.get('/api/demo1/history', customerSupport.getHistory);
app.get('/api/demo1/examples', customerSupport.getExamples);
app.post('/api/demo1/chat', customerSupport.handleChat);
app.post('/api/demo1/run-task', customerSupport.runTask);

// Demo 2 — Real Estate
app.get('/api/demo2/health', (req, res) => res.json({ ok: true, demo: 'Real Estate Lead Agent' }));
app.get('/api/demo2/history', realEstate.getHistory);
app.get('/api/demo2/examples', realEstate.getExamples);
app.post('/api/demo2/chat', realEstate.handleChat);
app.post('/api/demo2/run-task', realEstate.runTask);

// Demo 3 — Ecommerce
app.get('/api/demo3/health', (req, res) => res.json({ ok: true, demo: 'E-commerce Product Agent' }));
app.get('/api/demo3/history', ecommerce.getHistory);
app.get('/api/demo3/examples', ecommerce.getExamples);
app.post('/api/demo3/chat', ecommerce.handleChat);
app.post('/api/demo3/run-task', ecommerce.runTask);

// Demo 4 — Social Media
app.get('/api/demo4/health', (req, res) => res.json({ ok: true, demo: 'Social Media Content Agent' }));
app.get('/api/demo4/history', socialMedia.getHistory);
app.get('/api/demo4/examples', socialMedia.getExamples);
app.post('/api/demo4/chat', socialMedia.handleChat);
app.post('/api/demo4/run-task', socialMedia.runTask);

// Demo 5 — Job Recruitment
app.get('/api/demo5/health', (req, res) => res.json({ ok: true, demo: 'Job Recruitment Agent' }));
app.get('/api/demo5/history', jobRecruitment.getHistory);
app.get('/api/demo5/examples', jobRecruitment.getExamples);
app.post('/api/demo5/chat', jobRecruitment.handleChat);
app.post('/api/demo5/run-task', jobRecruitment.runTask);

app.listen(PORT, () => {
  console.log(`Multi-Agent Backend running on port ${PORT}`);
});
