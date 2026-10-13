import { usePortal } from '../../context/PortalContext';

export default function Profile() {
  const { data } = usePortal();
  const student = data?.student;

  return (
    <section className="profile-page">
      <div className="page-heading">
        <div>
          <h1>My Profile</h1>
          <p>View your personal and academic information.</p>
        </div>
      </div>

      <div className="profile-overview">
        <div className="profile-avatar">
          {student?.firstName?.charAt(0) ?? 'S'}
        </div>

        <div className="profile-identity">
          <h2>{student?.name ?? 'Student Name'}</h2>
          <p>Student ID: {student?.id ?? 'Not available'}</p>
          <span className="profile-status">Student Account</span>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-heading">
          <h2>Personal Information</h2>
          <p>Your basic account details.</p>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span>Full Name</span>
            <strong>{student?.name ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>First Name</span>
            <strong>{student?.firstName ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>Email Address</span>
            <strong>{student?.email ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>Academic Advisor</span>
            <strong>{student?.advisor ?? 'Not available'}</strong>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-heading">
          <h2>Academic Information</h2>
          <p>Your current academic overview.</p>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span>Program</span>
            <strong>{student?.program ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>Academic Year</span>
            <strong>{student?.year ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>Current Semester</span>
            <strong>{student?.semester ?? 'Not available'}</strong>
          </div>

          <div className="profile-info-item">
            <span>Current GPA</span>
            <strong>
              {student?.gpa != null ? student.gpa.toFixed(2) : 'Not available'}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>Earned Credits</span>
            <strong>{student?.earnedCredits ?? 0}</strong>
          </div>

          <div className="profile-info-item">
            <span>Required Credits</span>
            <strong>{student?.requiredCredits ?? 0}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}