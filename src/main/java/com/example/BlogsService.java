package com.example;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogsService {
   private final BlogsRepository blogsRepository;

    public BlogsService(BlogsRepository blogsRepository) {
        this.blogsRepository = blogsRepository;
    }

    public void insertBlogs(Blogs blogs) {
        blogsRepository.save(blogs);
    }

    public List<Blogs> getAllBlogs() {
        return blogsRepository.findAll();
    }

    public Blogs getBlogsById(Integer id) {
        return blogsRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Blogs not found for id :: " + id));
    }
    public void deleteBlogsById(Integer id) {
        blogsRepository.deleteById(id);
    }

    public void updateBlogsById(Blogs update, Integer id) {
        Blogs blogs = blogsRepository.findById(id).orElseThrow(() -> new IllegalStateException(id + " not found"));
        blogs.setTitle(update.getTitle());
        blogs.setAuthor(update.getAuthor());
        blogs.setContent(update.getContent());
        blogs.setDate(update.getDate());
        blogs.setImage(update.getImage());
        blogsRepository.save(update);
    }
}
