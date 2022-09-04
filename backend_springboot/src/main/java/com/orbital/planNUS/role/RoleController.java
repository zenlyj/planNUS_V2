package com.orbital.planNUS.role;

import com.orbital.planNUS.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.orbital.planNUS.HTTPStatusCode.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/role")
public class RoleController {
    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity getRoles() {
        UserResponse userResponse = new UserResponse();
        List<Role> roles = roleService.getAllRoles();
        List<String> jsonRoles = roles.stream()
                .map(role -> role.toJSONString())
                .collect(Collectors.toList());
        userResponse.setStatus(OK);
        userResponse.setData(jsonRoles.toString());
        return ResponseEntity.ok().body(userResponse);
    }

    @PostMapping
    public ResponseEntity addRole(@RequestBody Role role) {
        UserResponse userResponse = new UserResponse();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            roleService.addRole(role);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully added role");
            userResponse.setData(role.toJSONString());
        } catch (Exception e) {
            userResponse.setStatus(NotFound);
            userResponse.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(userResponse);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteRole(Long id) {
        UserResponse userResponse = new UserResponse();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            roleService.deleteRole(id);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully deleted role");
        } catch (Exception e) {
            userResponse.setStatus(NotFound);
            userResponse.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(userResponse);
        }
    }
}
