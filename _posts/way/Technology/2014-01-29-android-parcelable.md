---
layout: post
title: Android Parcelable Inside Another Parcelable
category: Technology
tag: ['Android']
lan: EN
---

It is too consuming to pass data using Java serializablein Android. Whereas, Android offers an other powerful tool: Parcelable.

<!--preview-->

Here is a guide of [using Parcelable](http://shri.blog.kraya.co.uk/2010/04/26/android-parcel-data-to-pass-between-activities-using-parcelable-classes/).

And there will be somewhat uncomfortable when you will reference some parcelable classes, especially `ParcelableArray` inside another Parcelable.

I found three efficient ways to do that:

* TypeArray

* TypeList

* ParcelableArray

### Scenario

We have two Classes, one is `Author`, the other is `Book`.
In the `Book` Class, we have a member variable `public Author[] authors`.

So, the problem is how we pass Book between activities with Parcels.

### TypeArray

Two normal ways are using `TypeArray` or `TypeList`.

In the `public void wirteToParcel(Parcel dest, int flags)` method of `Book` Class:

    Parcelable.Creator<Author> authorAarray =  Author.CREATOR;
    Author[] aps = authorAarray.

, and in `private void readFromParcel(Parcel in)` method,

    authors = Author.CREATOR.newArray(authorsParcel.length);
    int i = 0;
    for(Parcelable p : authorsParcel) {
      authors[i] = Author.CREATOR.createFromParcel(new Parcel(p));
      i++;
    }

### TypeList

In `writeToParcel` method:

    ArrayList<Author> authorInfo = new ArrayList<Author>();
    for(int i=0;i<authors.length;i++){
      authorInfo.add(authors[i]);
    }
    parcel.writeTypedList(authorInfo);  

, and in `Parcelable.Creator<Book> CREATOR`

    public static final Parcelable.Creator<Book> CREATOR = new Creator<Book>() {  
        public Book createFromParcel(Parcel source) {  
            ...
            ArrayList<Author> authors = new ArrayList<Author>();
            source.readTypedList(authors, Author.CREATOR);
            book.authors = new Author[authors.size()];
            for(int i=0;i<authors.size();i++){
              book.authors[i] = authors.get(i);
            }
            ...
            return book;  
        }  
        ...
    }; 

### ParcelableArray

In `writeToParcel` method, it is quite simple:

    dest.writeParcelableArray(authors, flags);

, as simple as in `readFromParcel` method:

    authors = (Author[]) in.readParcelableArray(Author.class.getClassLoader());

, and in a Constructor of `Book` Class:
  
    public Book(Parcel in) { 
        ...
        Parcelable[] parcelableArray = 
            in.readParcelableArray(Author.class.getClassLoader());
        if (parcelableArray != null) {
            this.authors = Arrays.copyOf(parcelableArray, parcelableArray.length, Author[].class);
        }
        ...
    }

In all the three cases above, there is no need to make any futher modification in the `Author` Class, just let it as simple as the most common Class who implements the `Parcelable` interface.

No matter a `in.read... ` function is written in `readFromParcel` method, or a `CREATOR`, or even a `Constructor`, there should be the same style as mentioned in these three cases. The important part is how we translate the `Author[] authors` from `Parcel source`.