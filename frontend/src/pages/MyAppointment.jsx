import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CANCEL_REASONS = [
  "Schedule conflict",
  "Feeling better now",
  "Found another doctor",
  "Emergency came up",
  "Other",
];

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Open modal — if payment done, show modal; if not paid, cancel directly
  const handleCancelClick = (appointmentId, isPaid) => {
    setSelectedAppointmentId(appointmentId);
    setSelectedReason("");
    setOtherReason("");
    if (isPaid) {
      setShowModal(true);
    } else {
      // No payment made, cancel directly without reason
      cancelAppointment(appointmentId);
    }
  };

  const cancelAppointment = async (appointmentId, reason = "") => {
    try {
      setCancelling(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(
          reason
            ? `Appointment cancelled — Reason: ${reason}`
            : "Appointment cancelled successfully"
        );
        setShowModal(false);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCancelling(false);
    }
  };

  const handleModalConfirm = () => {
    const finalReason =
      selectedReason === "Other" ? otherReason.trim() : selectedReason;
    if (!finalReason) {
      toast.error("Please select or enter a reason");
      return;
    }
    cancelAppointment(selectedAppointmentId, finalReason);
  };

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Doctor's Appointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success(data.message);
            setAppointment((prev) =>
              prev.map((appt) =>
                appt._id === order.receipt
                  ? { ...appt, payment: true }
                  : appt
              )
            );
            await getUserAppointments();
            navigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initpay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-2xl text-sky-500 border-b">
        My Appointments
      </p>

      <div>
        {appointment.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            {/* Doctor Image */}
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p className="text-medium text-zinc-700 mt-1">{item.docData.speciality}</p>
              <p>Address :</p>
              <p className="text-xs">{item.docData.address?.line1}</p>
              <p className="text-xs">{item.docData.address?.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time :{" "}
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 justify-end">

              {/* STATE 1: Cancelled */}
              {item.cancelled && (
                <button
                  disabled
                  className="sm:min-w-48 py-2 border border-red-500 rounded bg-red-100 text-red-600 font-medium cursor-not-allowed animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                >
                  Appointment Cancelled
                </button>
              )}

              {/* STATE 2: Paid — show Already Paid + Cancel option */}
              {!item.cancelled && item.payment && (
                <>
                  <button
                    disabled
                    className="sm:min-w-48 py-2 border border-green-500 rounded bg-green-100 text-green-700 font-medium cursor-not-allowed animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.7)]"
                  >
                    Already Paid
                  </button>
                  <button
                    onClick={() => handleCancelClick(item._id, true)}
                    className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}

              {/* STATE 3: Pending — Pay + Cancel */}
              {!item.cancelled && !item.payment && (
                <>
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-sky-500 hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                  <button
                    onClick={() => handleCancelClick(item._id, false)}
                    className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* ── Cancel Reason Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">

            <h2 className="text-lg font-semibold text-neutral-800 mb-1">
              Cancel Appointment
            </h2>
            <p className="text-sm text-zinc-500 mb-5">
              Please let us know why you're cancelling.
            </p>

            {/* Reason Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CANCEL_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                    selectedReason === reason
                      ? "bg-red-500 text-white border-red-500"
                      : "text-zinc-600 border-zinc-300 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {/* Other reason text input */}
            {selectedReason === "Other" && (
              <textarea
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none mb-4"
                rows={3}
                placeholder="Please describe your reason..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-zinc-300 text-sm text-zinc-600 hover:bg-zinc-50 transition-all duration-200"
              >
                Go Back
              </button>
              <button
                onClick={handleModalConfirm}
                disabled={cancelling}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {cancelling ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;