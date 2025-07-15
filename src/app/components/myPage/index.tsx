import React, { useState } from "react";
import "../../../css/myPage.css";

interface MemberData {
  memberNick: string;
  memberPhone: string;
  memberEmail: string;
  memberDescription: string;
  memberPassword: string;
}

const MyPage: React.FC = () => {
  const [memberData, setMemberData] = useState<MemberData>({
    memberNick: "BookLover123",
    memberPhone: "+1-234-567-8900",
    memberEmail: "booklover@example.com",
    memberDescription:
      "Passionate reader who loves fantasy and science fiction novels. Always looking for new book recommendations!",
    memberPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MemberData>({ ...memberData });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMemberData({ ...formData });
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
    console.log("Updated member data:", formData);
  };

  const handleCancel = () => {
    setFormData({ ...memberData });
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ ...memberData });
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1>My Profile</h1>
        <p>Manage your BookNest account information</p>
      </div>

      <div className="mypage-content">
        {/* Member Info Card */}
        <div className="member-info-card">
          <div className="card-header">
            <h2>Profile Information</h2>
            <button className="edit-btn" onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {!isEditing ? (
            <div className="info-display">
              <div className="info-item">
                <span className="info-label">Nickname:</span>
                <span className="info-value">{memberData.memberNick}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{memberData.memberPhone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{memberData.memberEmail}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Description:</span>
                <span className="info-value">
                  {memberData.memberDescription}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="memberNick">Nickname</label>
                <input
                  type="text"
                  id="memberNick"
                  name="memberNick"
                  value={formData.memberNick}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberPhone">Phone Number</label>
                <input
                  type="tel"
                  id="memberPhone"
                  name="memberPhone"
                  value={formData.memberPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberEmail">Email Address</label>
                <input
                  type="email"
                  id="memberEmail"
                  name="memberEmail"
                  value={formData.memberEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberDescription">Description</label>
                <textarea
                  id="memberDescription"
                  name="memberDescription"
                  value={formData.memberDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself and your reading preferences..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberPassword">New Password (optional)</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="memberPassword"
                    name="memberPassword"
                    value={formData.memberPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password to change"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Reading Stats Card */}
        <div className="stats-card">
          <h3>Reading Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">47</span>
              <span className="stat-label">Books Read</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Reviews Written</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Wishlist Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Days Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
