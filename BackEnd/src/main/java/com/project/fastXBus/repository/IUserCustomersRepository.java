package com.project.fastXBus.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.fastXBus.entity.UserCustomers;
@Repository
public interface IUserCustomersRepository extends JpaRepository<UserCustomers,Long >{

	Optional<UserCustomers> findByFirstName(String firstName);
	UserCustomers findByBookingsBookingId(Long bookingId);
	@Query("SELECT u.role FROM UserCustomers u WHERE u.firstName = :firstName")
    public String getRoleByFirstName(@Param("firstName") String firstName);
}
