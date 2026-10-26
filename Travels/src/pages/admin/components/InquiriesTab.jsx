import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Mail, Phone, Calendar, Users, DollarSign, Trash2, Eye, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const res = await api.getInquiries(params);
      if (res.success && res.data) {
        setInquiries(res.data);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    try {
      await api.deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      alert(`Error deleting inquiry: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Customer Bookings & Inquiries</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming booking reservations, custom trip planner submissions, and contact messages ({inquiries.length} total)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-semibold">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
          <span className="text-xs">Loading inquiries from database...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Inquiry Type</th>
                  <th className="py-3.5 px-4">Trip / Dates</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 block">{inq.name}</span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {inq.email}
                          </span>
                          {inq.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {inq.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          inq.type === 'booking'
                            ? 'bg-blue-100 text-blue-800'
                            : inq.type === 'custom_plan'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {inq.type === 'custom_plan' ? 'Custom Builder' : inq.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800 block">
                          {inq.tripTitle || inq.tripId || 'General Inquiry'}
                        </span>
                        {inq.travelDate && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{inq.travelDate}</span>
                            {inq.travelers && <span>({inq.travelers} Guests)</span>}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          inq.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : inq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : inq.status === 'archived'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id, inq.name)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-slate-400">
                      No inquiries found under this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Inquiry #{selectedInquiry.id}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  Submitted: {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block">Customer Name</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-bold text-amber-600 hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Phone</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.phone}</span>
                  </div>
                )}
                {selectedInquiry.country && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Country</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.country}</span>
                  </div>
                )}
              </div>

              {(selectedInquiry.tripTitle || selectedInquiry.travelDate) && (
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 font-semibold block">Target Package</span>
                    <span className="font-bold text-slate-800">{selectedInquiry.tripTitle || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Travel Date</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.travelDate || 'Flexible'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Travelers</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.travelers || 1} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Duration / Budget</span>
                    <span className="font-medium text-slate-800">
                      {selectedInquiry.duration || 'Standard'} / {selectedInquiry.budget || 'Flexible'}
                    </span>
                  </div>
                </div>
              )}

              {selectedInquiry.message && (
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Customer Message & Notes</span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-semibold">Change Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
