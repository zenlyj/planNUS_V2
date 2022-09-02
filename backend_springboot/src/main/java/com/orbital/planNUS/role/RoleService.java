package com.orbital.planNUS.role;

import com.orbital.planNUS.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return this.roleRepository.findAll();
    }

    public Role getStudentRole() throws Exception {
        Optional<Role> search = this.roleRepository.findRoleByName("ROLE_USER");
        if (search.isEmpty()) {
            throw new Exception("Database corruption: user role not found");
        }
        return search.get();
    }

    public void addRole(Role role) throws Exception {
        Optional<Role> search = roleRepository.findRoleByName(role.getName());
        if (search.isPresent()) {
            throw new Exception("Role already exists!");
        }
        roleRepository.saveAndFlush(role);
    }

    public void deleteRole(Long id) throws Exception {
        Optional<Role> search = roleRepository.findById(id);
        if (search.isEmpty()) {
            throw new Exception("Role does not exist");
        }
        roleRepository.deleteById(id);
    }
}
