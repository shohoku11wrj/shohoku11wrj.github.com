---
layout: post
title: Doubly Linked Hashmap
category: Technology
tags: ['DataStructure', 'Java']
lan: EN
date: 2014-12-28
---

My implementation of Doubly Linked Hashmap in Java.

LinkedHashmap is used specially for LRU Cache (least recently used cache).

It maintains the insertion order of entries of hashmap.

<!--preview-->

## Concept

See the LinkedHashmap datastructure.

<span style="color: #00F">Blue line</span> marks the order of insertion; 
<span style="color: #F00">Red line</span> marks the reverse order of insertion.

When the map is empty, there still left one <b>Head</b> element whose before/after pointers refer to itself.

![LinkedHashmap Datastructure](/images/linkedhashmap/LinkedHashMapDataStructure.png)

## Implementation

### First, we define the structure of an Entry. 
  
  Having the Before/After pointers is the main difference from the general Hashmap Entry.

![LinkedHashmap Entry](/images/linkedhashmap/LinkedHashMapEntry.png)

    public class Entry<K,V> {
      K key;
      V value;
      Entry<K,V> next;
      Entry<K,V> before;
      Entry<K,V> after;

      public Entry(K k, V v) {
        key = k;
        value = v;
      }

      public boolean equivalent(Entry<K,V> e) {
        return equivalent(e.getKey());
      }

      public boolean equivalent(K k) {
        return key.equals(k);
      }

      public K getKey() { return key; }
      public V getValue() { return value; }

      public String toString() {
        return key.toString() + " => " + value.toString();
      }

    }

### Then, the basic functions of LinkedHashmap class

    class LinkedHashmap<K,V> {
      final int MAX_SIZE = 10;
      LinkedList<Entry<K,V>>[] items;
      Entry<K,V> head;
      int size;

      public LinkedHashmap() {
        head = new Entry<K,V>(null,null);
        items = (LinkedList<Entry<K,V>>[]) new LinkedList[MAX_SIZE];
        head.before = head;
        head.after = head;
        size = 0;
      }

      public int hashCodeOfKey(K key) {
        return key.hashCode() % items.length;
      }

      public void put(K key, V value) {
        int x = hashCodeOfKey(key);
        if (items[x] == null) {
          items[x] = new LinkedList<Entry<K,V>>();
        }

        LinkedList<Entry<K,V>> collided = items[x];

        /* Look for items with same key and replace if found */
        for (Entry<K,V> e : collided) {
          if (e.equivalent(key)) {
            collided.remove(e);
            size--;
            break;
          }
        }

        Entry<K,V> entry = new Entry<K,V>(key, value);
        collided.add(entry);
        entry.after = head;
        entry.before = head.before;
        entry.before.after = entry;
        entry.after.before = entry;
        size++;
      }

      public V get(K key) {
        int x = hashCodeOfKey(key);
        if (items[x] == null) {
          return null;
        }
        LinkedList<Entry<K,V>> collided = items[x];
        for (Entry<K,V> e : collided) {
          if (e.equivalent(key)) {
            return e.getValue();
          }
        }
        return null;
      }

      public V remove(K key) {
        int x = hashCodeOfKey(key);
        if (items[x] == null) {
          return null;
        }
        LinkedList<Entry<K,V>> collided = items[x];
        for (Entry<K,V> e : collided) {
          if (e.equivalent(key)) {
            e.before.after = e.after;
            e.after.before = e.before;
            collided.remove(e);
            size--;
            return e.getValue();
          }
        }
        return null;
      }

      public String toString() {
        StringBuilder s = new StringBuilder();
        Entry<K,V> traverser = head.after;
        while (traverser != head) {
          s.append(traverser.toString() + " , ");
          traverser = traverser.after;
        }
        return s.toString();
      }

    }

### Moreover, an Iterator will be useful of any collection.

Inside the LinkedHashmap class, we can define an Iterator.

    public Iterator<Entry<K,V>> iterator() {
      return new DoublyLinkedHahmapIterator();
    }

    private class DoublyLinkedHahmapIterator implements Iterator<Entry<K,V>> {
      private Entry<K,V> curr;
      private Entry<K,V> lastAccessed;
      private int index = 0;

      public DoublyLinkedHahmapIterator() {
        index = 0;
        curr = head.after;
        lastAccessed = head;
      }

      public boolean hasNext()     { return index < size; }
      public boolean hasPrevious() { return index > 0; }
      public int previousIndex()   { return index - 1; }
      public int nextIndex()       { return index; }

      public Entry<K,V> next() {
        if (!hasNext()) throw new NoSuchElementException();
        lastAccessed = curr;
        Entry<K,V> e = curr;
        curr = curr.after;
        index++;
        return e;
      }

      public Entry<K,V> previous() {
        if (!hasNext()) throw new NoSuchElementException();
        curr = curr.before;
        index--;
        lastAccessed = curr;
        return curr;
      }

      public void remove() {
        if (lastAccessed == null) throw new IllegalStateException();
        if (curr == lastAccessed) //TODO why this?
          curr = lastAccessed.after;
        else
          index--;
        LinkedHashmap.this.remove(lastAccessed.getKey());
      }
    }

Then the __toString()__ function could use the Iterator to traverse the collection by the insertion order.

    public String toString() {
      StringBuilder s = new StringBuilder();
      Iterator<Entry<K,V>> iterator = this.iterator();
      while (iterator.hasNext()) {
        s.append(iterator.next().toString() + " , ");
      }
      return s.toString();
    }

## Usage

### LRU Cache

  LRU Cache is used for cache the frequently used resources rather than retrive them from outer source with limited storage (especially in RAM).

![LinkedHashmap RecordAccess](/images/linkedhashmap/linkedHashMap_RecordAceess.png)

  The method __public V get(K key)__ should be modified. Every requested Entry will be moved to the position before/after the Head.

    public V get(K key) {
      int x = hashCodeOfKey(key);
      if (items[x] == null) {
        return null;
      }
      LinkedList<Entry<K,V>> collided = items[x];
      for (Entry<K,V> e : collided) {
        if (e.equivalent(key)) {
          if (head.after != e) {
            // remove this entry
            e.before.after = e.after;
            e.after.before = e.before;
            // add this entry back to head
            e.after = head;
            e.before = head.before;
            e.before.after = e;
            e.after.before = e;
          }
          return e.getValue();
        }
      }
      return null;
    }

<blockquote>

<h4>Reference</h4> <br/>

1. <a href="http://algs4.cs.princeton.edu/13stacks/DoublyLinkedList.java.html">code of Doubly Linked List</a> <br/>
2. <a href="http://javarticles.com/2012/06/linkedhashmap.html">guide of Linked Hashmap</a> <br/>
3. <a href="https://github.com/gaylemcd/ctci/tree/master/java/Chapter%208/Question8_10">Cracking the Coding Interview, C8Q10<a/>
</blockquote>
