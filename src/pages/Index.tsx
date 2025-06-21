"use client";
import React, { useState } from "react";

interface FormData {
  requesterName: string;
  title: string;
  description: string;
  location: string;
  issueType: string;
  additionalNotes: string;
  date: string;
}
const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    requesterName: "",
    title: "",
    description: "",
    location: "",
    issueType: "",
    additionalNotes: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://192.168.1.18:3001/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
      setFormData({
        requesterName: "",
        title: "",
        description: "",
        location: "",
        issueType: "",
        additionalNotes: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error:", error);
      setErrors({ ...errors, description: "فشل في إرسال النموذج." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const issueTypes = [
    { value: "", label: "اختر نوع المشكلة" },
    { value: "internet", label: "ضعف انترنت" },
    { value: "phone", label: "فصل هاتف" },
    { value: "printer", label: "مشاكل في الطابعة" },
    { value: "software", label: "البرنامج" },
    { value: "other", label: "غير ذلك" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = "هذا الحقل مطلوب";
    }

    if (!formData.title.trim()) {
      newErrors.title = "هذا الحقل مطلوب";
    }

    if (!formData.description.trim()) {
      newErrors.description = "هذا الحقل مطلوب";
    }

    if (!formData.location.trim()) {
      newErrors.location = "هذا الحقل مطلوب";
    }

    if (!formData.issueType) {
      newErrors.issueType = "هذا الحقل مطلوب";
    }

    if (!formData.date) {
      newErrors.date = "هذا الحقل مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-700 arabic-text mb-4">
              تم إرسال الشكوى بنجاح
            </h1>
            <p className="text-slate-600 arabic-text mb-8">
              شكراً لك على تقديم الشكوى. سيتم مراجعتها والرد عليك في أقرب وقت
              ممكن.
            </p>
            <button
              onClick={resetForm}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 arabic-text"
            >
              تقديم شكوى جديدة
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-500 arabic-text text-sm">
              © 2025 - قسم تقنية المعلومات
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h3l2-4 4 8 2-4h3"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-700 arabic-text mb-2">
            نظام الشكاوى والاقتراحات
          </h1>
          <p className="text-slate-600 arabic-text">
            قسم تقنية المعلومات - مستشفى البر
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Requester Name */}
          <div>
            <label htmlFor="requesterName" className="form-label">
              اسم مقدم الشكوى أو الاقتراح{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="requesterName"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleInputChange}
              className={`form-input ${errors.requesterName ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
              placeholder="أدخل اسمك الكامل"
            />
            {errors.requesterName && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.requesterName}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label">
              العنوان <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-input ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
              placeholder="عنوان مختصر للمشكلة أو الاقتراح"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.title}
              </p>
            )}
          </div>

          {/* Issue Type */}
          <div>
            <label htmlFor="issueType" className="form-label">
              النوع <span className="text-red-500">*</span>
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              className={`form-select ${errors.issueType ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
            >
              {issueTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                  className="arabic-text"
                >
                  {type.label}
                </option>
              ))}
            </select>
            {errors.issueType && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.issueType}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="form-label">
              المكان <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`form-input ${errors.location ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
              placeholder="القسم أو المكان المحدد"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.location}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">
              الوصف <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`form-input resize-none ${errors.description ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
              placeholder="وصف تفصيلي للمشكلة أو الاقتراح..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.description}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="additionalNotes" className="form-label">
              ملاحظات إضافية
            </label>
            <input
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className="form-input"
              placeholder="أي معلومات إضافية (اختياري)"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="form-label">
              التاريخ <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`form-input ${errors.date ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1 arabic-text">
                {errors.date}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                جاري الإرسال...
              </div>
            ) : (
              "إرسال"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 arabic-text text-sm">
            © 2025 - قسم تقنية المعلومات
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
