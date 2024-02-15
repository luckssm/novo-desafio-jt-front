import API from "./api";

const getTickets = ({ searchTerm }: { searchTerm: string }) =>
  API.get(`/tickets?search=${searchTerm}`);
// This paginated call cannot be used due to the lack of total pages information from backend
// API.get(`/tickets?page=${currentPage}&limit=${6}&search=${search ? search : ''}`)

const getTicketById = ({ id }) => API.get(`/tickets/${id}`);

export { getTickets, getTicketById };
