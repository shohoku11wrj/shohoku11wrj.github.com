---
layout: post
title: An Android SQLite Example
category: Technology
tag: ['Android', 'sqlite', 'db' ]
lan: EN
---

I don't like database. Although sqlite is light-weighted and relatively easy to use, I don't like using sqlite.

A most important reason is that DBs are not easy to set-up.

<!--preview-->

Admittedly, database is useful, as well as sqlite is important for an Android developer.

Database is my somewhat the lower slab in my technique bucket. I'd like to analysize this code snip step by step so that I can have a reference in the future.

## Example

A BookStore project guide and requirement offered by [Prof. Duggan](http://www.dominicduggan.org/) at Stevens in course CS522 Mobile Systems and Applications.

Here is an exmaple of using sqlite in Adnroid: `CartDbAdapter.java`.(Um... It's lucky that I'm serving as a CA for an course about mobile systems. So I can access a lot of excellent codes from others.)


We have a database instance called Cart, and a Table called Book.
There are two files for dealing with sqlite: `BookContract.java` and a database adapter class `CartDbAdapter.java`.

### BookContract.java

* defines the names of the columns in your database)

* for each operation, define a type-specific read operation that reads the value of the column from a cursor, and a type-specific write operation that adds the value in a column to a [ContentValues](http://www.vogella.com/tutorials/AndroidSQLite/article.html) object.

### CartDbAdapter.java

* Useful string literals such as _DATABASE_CREATE_ (the SQL command to create the database), _DATABASE_NAME_, _BOOK_TABLE_, _AUTHOR_TABLE_, _DATABASE_VERSION_, etc.

* A private static inner class classed `DatabaseHelper` that __extends__ `SQLiteOpenHelper` with logic for creating the database and upgrading where necessary.

* Useful application-specific operations for accessing the database:

some sample operations:

    public CartDbAdapter open throws SQLException;
    public Cursor fetchAllBooks();
    ...

### How to use

In your main activity where you display the contents of the shopping cart in a ListView, use the `SimpleCursorAdapter` class to connect the cursor resulting from a query to the list view.

A deprecated constructor for `SimpleCursorAdapter`:

    public SimpleCursorAdapter(Context context, int layout,
                        Cursor c, String[] from, int[] to);

You can use the predefined layout resource `android.R.layout.simple_list_item_2` as the layout resource for each row in your list view. Display the title and authors of each book:

    String[] from = new String[] { BookContract.TITLE,
                                   BookContract.AUTHORS };
    int[] to = new int[] { android.R.id.text1,
                           android.R.id.text2 };

### Note

By default, __foreign key__ constraint enforcement is not enabled in SQLite. You can enable it on each connection to the database by executing:

    db.execSQL("PRAGMA foreign_keys=ON;");

## Code snips

### BookContract.java

    public class BookContract{
      
      public static final String TITLE = "title"; 
      // omit the rest fields
      
      public static String getTitle(Cursor cursor) { 
        return cursor.getString(cursor.getColumnIndexOrThrow(TITLE));
      } 
      
      public static void putTitle( ContentValues values, String title) 
      { 
        values.put(TITLE, title);
      } 
      
      // The rest getter() and putter()

    }

### CartDbAdapter.java

    public class CartDbAdapter {

      static final String KEY_ROWID = "_id";
      static final String KEY_TITLE = "title";
      // omit the rest fields
      
      static final String TAG = "DBAdapter";
      
      static final String DATABASE_NAME = "BookStore.db";
      static final String BOOK_TABLE = "Books";
      static final String AUTHOR_TABLE = "AuthorTable";
      static final int DATABASE_VERSION = 1;
      
      static final String DATABASE_CREATE =
      "CREATE TABLE " + BOOK_TABLE + " (" + KEY_ROWID +" INTEGER PRIMARY KEY AUTOINCREMENT, "
      + "title TEXT, authors TEXT ,isbn TEXT, price TEXT)";
      

      // !!!! important variables !!!!
      final Context context;
      DatabaseHelper DBHelper;
      SQLiteDatabase db;
      
      public CartDbAdapter(Context ctx)
      {
        this.context = ctx;
        DBHelper = new DatabaseHelper(context);
      }
      
      // The static inner class which extends SQLiteOpenHelper
      private static class DatabaseHelper extends SQLiteOpenHelper
      {
        DatabaseHelper(Context context)
        {
          super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }
        @Override
        public void onCreate(SQLiteDatabase db)
        {
          try 
          {
            db.execSQL(DATABASE_CREATE);
          }
          catch (SQLException e) 
          {
            e.printStackTrace();
          }
        }
        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)
        {
          Log.w(TAG, "Upgrading database from version " + oldVersion + " to "
              + newVersion + ", which will destroy all old data");
          db.execSQL("DROP TABLE IF EXISTS contacts");
          onCreate(db);
        }
      }
      
      //---opens the database---
      public CartDbAdapter open() throws SQLException
      {
        db = DBHelper.getWritableDatabase();
        return this;
      }
      
      
      public void persist( Book book )throws SQLException
      {
        ContentValues initialValues = new ContentValues();
        book.writeToProvider( initialValues );
      
        db.insert(BOOK_TABLE, null, initialValues);
      }
        
      public boolean deleteBook(Book book)
      { 
        return db.delete(BOOK_TABLE, KEY_TITLE + "='" + book.title + "'", null) > 0;    
      }

      
      public boolean deleteBook(long id)
      { 
        return db.delete(BOOK_TABLE, KEY_ROWID+ "=" + id, null) > 0;    
      }

      public boolean deleteAll(){
      return db.delete(BOOK_TABLE, null, null) > 0;   
      }
      
      //---retrieves all books---
      public Cursor fetchAllBooks()
      {
        return db.query(BOOK_TABLE, new String[] {KEY_ROWID, KEY_TITLE,
            KEY_AUTHORS, KEY_ISBN, KEY_PRICE}, null, null, null, null, null);
      }
      
      //---retrieves one book---
      public Book fetchBook(long rowId) throws SQLException
      {
        Cursor mCursor =
            db.query(true, BOOK_TABLE, new String[] {KEY_ROWID, KEY_TITLE,
                KEY_AUTHORS, KEY_ISBN, KEY_PRICE}, KEY_ROWID + "=" + rowId, null,
                null, null, null, null);
        if (mCursor != null) 
        {
          mCursor.moveToFirst();
        }
        
        Book fetchResult = new Book( mCursor );
        
        return fetchResult;
      }
      
      public Cursor fetchBook( Book book ) throws SQLException
      {
        Cursor mCursor =
            db.query(true, BOOK_TABLE, new String[] {KEY_ROWID, KEY_TITLE,
                KEY_AUTHORS, KEY_ISBN, KEY_PRICE}, KEY_TITLE + "='" + book.title + "'", null,
                null, null, null, null);
        if (mCursor != null) 
        {
          mCursor.moveToFirst();
        }
          
        return mCursor;
      }
      
      //---closes the database---
      public void close()
      {
        DBHelper.close();
      }

    }

### Book Class

We have a `Book( Cursor cursor)` constructor and `void writeToProvider( ContentValues values)` method:

    public Book(Cursor cursor)
    {
      this.title = BookContract.getTitle(cursor);
      //this.other fields = BookContract.get other fields(cursor)
    }

    public void writeToProvider( ContentValues values)
    {
      BookContract.putTitle(values, title);
      // BookContract.put other fields
    }

The `writeToProvider(Cursor cursor)` method is used by `persist(Book book)` in `CartDbAdapter.java`method, for inserting a new row of book into the `Book` table.


### In ListView to show books

This ListView is in an activity extents `ListActivity`:

    @SuppressWarnings("deprecation")
    public void updateView()
    {
      CartDbAdapter bookCartDb = new CartDbAdapter( this );
      bookCartDb.open();
      Cursor allBooks = bookCartDb.fetchAllBooks();
      
      CartInfo = getListView();

      if( allBooks.moveToFirst())
      {
        bookInfoAdapter = new SimpleCursorAdapter(this,
          R.layout.simple_list_item_2, allBooks, from, to);
        /* Use `String [] from` and `int[] to` as:
           String[] from = new String[] { BookContract.TITLE,
                                   BookContract.AUTHORS };
           int[] to = new int[] { android.R.id.text1,
                           android.R.id.text2 };
         */
      }
      else
      {
        bookInfoAdapter = new SimpleCursorAdapter(this,
            android.R.layout.simple_list_item_2, allBooks,
            new String[]{}, to);     
      }

      CartInfo.setAdapter( bookInfoAdapter ); 
      bookCartDb.close();
      
    }

Till now, the most important snips dealing with SQLite have been explained.

You can also follow a more detailed guide from [Vogella](http://www.vogella.com/tutorials/AndroidSQLite/article.html) object. __Vogella__ is a great reference for Java and Android developers .
