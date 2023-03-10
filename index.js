const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { DBConnection } = require('./config/database');
require('dotenv').config();

const app = express();
const AuthRoutes = require('./routes/AuthRoutes');
const AbsensiRoutes = require('./routes/AbsensiRoutes');
const OvertimeRoutes = require('./routes/OvertimeRoutes');
const PengumumanRoutes = require('./routes/PengumumanRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');
const ReimbursmentRoutes = require('./routes/ReimbursmentRoutes');
const { unassignedOvertime, unassignedReimbursment } = require('./scheduler/NotificationScheduler');

DBConnection();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(AuthRoutes);
app.use(ProfileRoutes);
app.use('/absen', AbsensiRoutes);
app.use('/overtime', OvertimeRoutes);
app.use('/pengumuman', PengumumanRoutes);
app.use('/reimbursment', ReimbursmentRoutes);

/**
 * Cron Job
 */
unassignedOvertime();
unassignedReimbursment();

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`App running on port ${process.env.BACKEND_PORT}`)
);
