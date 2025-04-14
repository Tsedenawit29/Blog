package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;
@Entity
public class Blogs {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;
    private  String author;
    private String title;
    private String content;
    private String image;
    private String date;

    public Blogs() {
    }
    public Blogs(int id, String author, String title, String content, String image, String date) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.image = image;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Blogs blogs = (Blogs) o;
        return id == blogs.id && Objects.equals(author, blogs.author) && Objects.equals(title, blogs.title) && Objects.equals(content, blogs.content) && Objects.equals(image, blogs.image) && Objects.equals(date, blogs.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author, title, content, image, date);
    }
}
