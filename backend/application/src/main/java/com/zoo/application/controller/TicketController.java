package com.zoo.application.controller;

import com.zoo.application.model.Ticket;
import com.zoo.application.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping
    public Ticket bookTicket(@Valid @RequestBody Ticket ticket) {
        return ticketService.bookTicket(ticket);
    }

    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @Valid @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }

    @PutMapping("/confirm/{id}")
    public Ticket confirmTicket(@PathVariable Long id) {
        return ticketService.confirmTicket(id);
    }

    @DeleteMapping("/{id}")
    public String deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return "Ticket deleted successfully";
    }
}