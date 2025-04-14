package com.example;
import com.example.Blogs;
import com.example.BlogsService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogsController {
    private final BlogsService blogsService;

    public BlogsController(BlogsService blogsService) {
        this.blogsService = blogsService;
    }
    @PostMapping
    public void addNewSoftwareEngineer(@RequestBody Blogs blogs){
        blogsService.insertBlogs(blogs);;
    }
    @GetMapping
    public List<Blogs> getBlogs(){
        return blogsService.getAllBlogs();
    }
    @GetMapping(value = "{id}")
    public Blogs getBlogsById( @PathVariable Integer id){
        return blogsService.getBlogsById(id);
    }
    @DeleteMapping(value = "{id}")
    public  void deleteBlogsById(@PathVariable Integer id){
        blogsService.deleteBlogsById(id);
    }
    @PutMapping(value = "{id}")
    public void updateBlogsById(@RequestBody Blogs blogs, @PathVariable Integer id){
        blogsService.updateBlogsById(blogs, id);

    }

}
