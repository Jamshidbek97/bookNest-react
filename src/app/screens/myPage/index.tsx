import React, { ChangeEvent, useState } from "react";
import "../../../css/myPage.css";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const { authMember, setAuthMember } = useGlobals();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberEmail: authMember?.memberEmail,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
      memberPassword: authMember?.memberPassword,
    }
  );

  /** HANDLERS **/
  const memberNickHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberUpdateInput((prev) => ({
      ...prev,
      memberNick: e.target.value,
    }));
  };

  const memberPhoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberUpdateInput((prev) => ({
      ...prev,
      memberPhone: e.target.value,
    }));
  };

  const memberEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberUpdateInput((prev) => ({
      ...prev,
      memberEmail: e.target.value,
    }));
  };

  const memberDescHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemberUpdateInput((prev) => ({
      ...prev,
      memberDesc: e.target.value,
    }));
  };

  const memberPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberUpdateInput((prev) => ({
      ...prev,
      memberPassword: e.target.value,
    }));
  };

  const stripEmptyFields = <T extends Record<string, any>>(
    input: T
  ): Partial<T> => {
    return Object.fromEntries(
      Object.entries(input).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    ) as Partial<T>;
  };

  const submitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // 1. Remove empty fields like password: ""
      const cleanedInput = stripEmptyFields(memberUpdateInput);

      // 2. Create FormData and append non-empty fields
      const formData = new FormData();
      Object.entries(cleanedInput).forEach(([key, value]: any) => {
        formData.append(key, value);
      });

      // 3. Conditionally append profile image
      if (profileFile) {
        formData.append("memberImage", profileFile);
      }

      // 4. Send FormData to service
      const result = await new MemberService().updateMember(formData);

      // 5. Success handling
      setAuthMember(result);
      sweetTopSuccessAlert("Information updated successfully", 800);
    } catch (error) {
      await sweetErrorHandling(error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
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

  const history = useHistory();

  if (!authMember) history.push("/home");

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
                <span className="info-label">Profile Image:</span>
                <img
                  src={
                    authMember?.memberImage?.startsWith("uploads/")
                      ? `${serverApi}/${authMember.memberImage}`
                      : `${serverApi}/uploads/members/${authMember?.memberImage}`
                  }
                  alt="Profile"
                  className="profile-image"
                />
              </div>

              <div className="info-item">
                <span className="info-label">Nickname:</span>
                <span className="info-value">
                  {authMember?.memberNick
                    ? authMember.memberNick
                    : memberData.memberNick}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">
                  {authMember?.memberPhone
                    ? authMember?.memberPhone
                    : memberData.memberPhone}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">
                  {authMember?.memberEmail ?? memberData.memberEmail}{" "}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Description:</span>
                <span className="info-value">{authMember?.memberDesc}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={submitButton} className="edit-form">
              <div className="form-group">
                <label htmlFor="memberNick">Nickname</label>
                <input
                  type="text"
                  id="memberNick"
                  name="memberNick"
                  value={memberUpdateInput?.memberNick || ""}
                  onChange={memberNickHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberPhone">Phone Number</label>
                <input
                  type="tel"
                  id="memberPhone"
                  name="memberPhone"
                  value={memberUpdateInput?.memberPhone || ""}
                  onChange={memberPhoneHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberEmail">Email Address</label>
                <input
                  type="email"
                  id="memberEmail"
                  name="memberEmail"
                  value={memberUpdateInput?.memberEmail || ""}
                  onChange={memberEmailHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberDescription">Description</label>
                <textarea
                  id="memberDescription"
                  name="memberDescription"
                  value={memberUpdateInput?.memberDesc || ""}
                  onChange={memberDescHandler}
                  rows={4}
                  placeholder="Tell us about yourself and your reading preferences..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProfileFile(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewImage && (
                  <div className="image-preview">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="preview-img"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="memberPassword">New Password (optional)</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="memberPassword"
                    name="memberPassword"
                    value={memberUpdateInput?.memberPassword || ""}
                    onChange={memberPasswordHandler}
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="save-btn"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
