package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.Ticket;
import com.zoo.application.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket bookTicket(Ticket ticket) {
        double adultPrice = 200;
        double childPrice = 100;

        double total = (ticket.getAdults() * adultPrice) + (ticket.getChildren() * childPrice);
        ticket.setTotalAmount(total);

        if (ticket.getStatus() == null || ticket.getStatus().isBlank()) {
            ticket.setStatus("PENDING");
        }

        return ticketRepository.save(ticket);
    }

    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setVisitorName(updatedTicket.getVisitorName());
            ticket.setEmail(updatedTicket.getEmail());
            ticket.setPhone(updatedTicket.getPhone());
            ticket.setVisitDate(updatedTicket.getVisitDate());
            ticket.setAdults(updatedTicket.getAdults());
            ticket.setChildren(updatedTicket.getChildren());

            double adultPrice = 200;
            double childPrice = 100;
            double total = (updatedTicket.getAdults() * adultPrice) + (updatedTicket.getChildren() * childPrice);
            ticket.setTotalAmount(total);

            ticket.setStatus(updatedTicket.getStatus());
            return ticketRepository.save(ticket);
        }).orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    public Ticket confirmTicket(Long id) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setStatus("CONFIRMED");
            return ticketRepository.save(ticket);
        }).orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    public void deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ticket not found with id: " + id);
        }
        ticketRepository.deleteById(id);
    }
}