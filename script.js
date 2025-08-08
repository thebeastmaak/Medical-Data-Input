const API_URL = "https://medical-dpp-backend.onrender.com";

document.getElementById("patient-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const patient = {
    full_name: document.getElementById("full_name").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    id_number: document.getElementById("id_number").value.trim(),
    patient_id: document.getElementById("patient_id").value.trim(),
    photo_url: document.getElementById("photo_url").value.trim(),  // NEW PHOTO URL
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    emergency_name: document.getElementById("emergency_name").value.trim(),
    emergency_relationship: document.getElementById("emergency_relationship").value.trim(),
    emergency_phone: document.getElementById("emergency_phone").value.trim(),
    insurance_provider: document.getElementById("insurance_provider").value.trim()
  };

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });

    const data = await res.json();
    alert(data.message || "✅ Patient added successfully.");
    // Optionally clear form or reset here
  } catch (err) {
    console.error("❌ Error adding patient:", err);
    alert("❌ Failed to add patient.");
  }
});

async function getPatient() {
  const id = document.getElementById("search_patient_id").value.trim();
  const resultContainer = document.getElementById("result");

  try {
    const res = await fetch(`${API_URL}/patient/${id}`);
    const data = await res.json();

    if (data.patient_id) {
      resultContainer.innerHTML = `
        <h2>Patient Details</h2>
        ${data.photo_url ? `<img src="${data.photo_url}" alt="Patient Photo" style="max-width:150px; border-radius:8px; margin-bottom: 10px;">` : ""}
        <p><strong>🆔 Patient ID:</strong> ${data.patient_id}</p>
        <p><strong>👤 Name:</strong> ${data.full_name}</p>
        <p><strong>🎂 Date of Birth:</strong> ${data.dob}</p>
        <p><strong>⚧ Gender:</strong> ${data.gender}</p>
        <p><strong>🛂 ID/Passport:</strong> ${data.id_number || "N/A"}</p>
        <p><strong>📞 Phone:</strong> ${data.phone}</p>
        <p><strong>📧 Email:</strong> ${data.email || "N/A"}</p>
        <p><strong>🏠 Address:</strong> ${data.address || "N/A"}</p>
        <p><strong>🚨 Emergency Contact:</strong> ${data.emergency_name} (${data.emergency_relationship || "N/A"}) - ${data.emergency_phone}</p>
        <p><strong>🏥 Insurance Provider:</strong> ${data.insurance_provider || "N/A"}</p>
      `;
    } else {
      resultContainer.textContent = "❌ Patient not found.";
    }
  } catch (err) {
    console.error("Error fetching patient:", err);
    resultContainer.textContent = "❌ Failed to fetch patient.";
  }
}
