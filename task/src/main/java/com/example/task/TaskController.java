package com.example.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTask(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task postTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @DeleteMapping("{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }


    @PutMapping("{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updateTask) {
        return taskRepository.findById(id).map(task -> {
            task.setContent(updateTask.getContent());
            task.setCompleted(updateTask.isCompleted());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task Not Found"));
    }


}
