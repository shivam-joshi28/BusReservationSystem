package com.project.fastXBus.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.project.fastXBus.dto.BusesDTO;
import com.project.fastXBus.entity.Buses;

public interface IBusesService {

	public Buses createBuses(BusesDTO busesdto);
	public Buses updateBuses(BusesDTO busesdto,Long busId);
	public void  deleteBuses(Long busId);
	public BusesDTO getBusById(Long busId);
	 List<BusesDTO> getAllBusesByCitiesAndDate(String sourceCity, String destinationCity, LocalDate date);
	 Buses findBusDetailsByBookingId(@Param("bookingId") Long bookingId);
	public List<BusesDTO>getAllBuses();
}
