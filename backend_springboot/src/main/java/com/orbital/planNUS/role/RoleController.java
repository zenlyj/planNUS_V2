package com.orbital.planNUS.role;

import com.orbital.planNUS.ResponseBody;
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
    public ResponseEntity<ResponseBody> getRoles() {
        ResponseBody responseBody = new ResponseBody();
        List<Role> roles = roleService.getAllRoles();
        List<String> jsonRoles = roles.stream()
                .map(role -> role.toJSONString())
                .collect(Collectors.toList());
        responseBody.setStatus(OK);
        responseBody.setData(jsonRoles.toString());
        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addRole(@RequestBody Role role) {
        ResponseBody responseBody = new ResponseBody();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            roleService.addRole(role);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully added role");
            responseBody.setData(role.toJSONString());
        } catch (Exception e) {
            responseBody.setStatus(NotFound);
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
            responseBody.setStatus(NotFound);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
