import { useState } from 'react';
import { motion } from 'motion/react';
import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Pencil,
  Check,
  X,
} from 'lucide-react';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Student Name');
  const [email, setEmail] = useState('student@uniflow.edu');
  const [phone, setPhone] = useState('');
  const [advisor, setAdvisor] = useState('');

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="profile-header">
        <div>
          <p className="profile-eyebrow">MY ACCOUNT</p>
          <h1>My Profile</h1>
          <p>Manage your personal and academic information.</p>
        </div>

        {!editing ? (
          <button
            className="profile-edit-btn"
            onClick={() => setEditing(true)}
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-actions">
            <button
              className="profile-save-btn"
              onClick={() => setEditing(false)}
            >
              <Check size={16} />
              Done
            </button>

            <button
              className="profile-cancel-btn"
              onClick={() => setEditing(false)}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <section className="profile-hero">
        <div className="profile-avatar">
          <UserRound size={38} />
        </div>

        <div>
          <h2>{name}</h2>
          <p>Student Account</p>
          <span className="profile-status">Active Student</span>
        </div>
      </section>

      <div className="profile-sections">
        <section className="profile-card">
          <div className="profile-card-title">
            <UserRound size={19} />
            <h3>Personal Information</h3>
          </div>

          <div className="profile-fields">
            <label>
              Full Name
              <input
                value={name}
                readOnly={!editing}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Email Address
              <span className="profile-input-icon">
                <Mail size={16} />
                <input
                  type="email"
                  value={email}
                  readOnly={!editing}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </label>

            <label>
              Phone Number
              <span className="profile-input-icon">
                <Phone size={16} />
                <input
                  value={phone}
                  readOnly={!editing}
                  placeholder="Add phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </span>
            </label>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-title">
            <GraduationCap size={20} />
            <h3>Academic Information</h3>
          </div>

          <div className="profile-fields">
            <label>
              Student ID
              <input value="Not assigned" readOnly />
            </label>

            <label>
              Academic Program
              <span className="profile-input-icon">
                <BookOpen size={16} />
                <input value="Not assigned" readOnly />
              </span>
            </label>

            <label>
              Academic Advisor
              <input
                value={advisor}
                readOnly={!editing}
                placeholder="Add advisor name"
                onChange={(e) => setAdvisor(e.target.value)}
              />
            </label>
          </div>
        </section>
      </div>

      <p className="profile-note">
        This profile currently uses sample information. Changes are kept
        in the current screen and are not saved to the university database yet.
      </p>
    </motion.div>
  );
}