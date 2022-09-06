package com.orbital.planNUS.role;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/role")
public class RoleController {
    private final RoleService roleService;
    private final ObjectMapper objectMapper;

    @Autowired
    public RoleController(RoleService roleService, ObjectMapper objectMapper) {
        this.roleService = roleService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getRoles() {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            List<String> jsonRoles = new ArrayList<>();
            for (Role role : roleService.getAllRoles()) {
                jsonRoles.add(objectMapper.writeValueAsString(role));
            }
            responseBody.setStatus(OK);
            responseBody.setData(jsonRoles.toString());
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addRole(@RequestBody Role role) {
        ResponseBody responseBody = new ResponseBody();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            roleService.addRole(role);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully added role");
            responseBody.setData(objectMapper.writeValueAsString(role));
        } catch (Exception e) {
            responseBody.setStatus(NOT_FOUND);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteRole(Long id) {
        ResponseBody responseBody = new ResponseBody();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            roleService.deleteRole(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted role");
        } catch (Exception e) {
            responseBody.setStatus(NOT_FOUND);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
