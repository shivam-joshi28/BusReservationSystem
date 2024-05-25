package com.project.fastXBus.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.fastXBus.dto.AuthRequest;
import com.project.fastXBus.service.JwtService;
import com.project.fastXBus.service.UserCustomersService;

@RestController
@RequestMapping("/api/v1/allsinglelogin")
@CrossOrigin("http://localhost:4441")
public class SingleLoginRestController {
	@Autowired
	private JwtService jwtService;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserCustomersService service;
	
	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {

		Authentication authenticate = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

		String token = null;
		
		if (authenticate.isAuthenticated()) {

			token = jwtService.generateToken(authRequest.getUsername());
			
		}

		else {
			
			throw  new UsernameNotFoundException("Invalid Username or Password / Invalid request");
		}
	
		return token;
	
	}
	@GetMapping("/gettherole/{firstName}")
	public String getRoleByfirstName(@PathVariable String firstName) {
	return service.getRoleByfirstName(firstName);}
	@GetMapping("/getId/{firstName}")
	public Long getId(@PathVariable String firstName) {
		return service.getId(firstName);
	}
	
}
