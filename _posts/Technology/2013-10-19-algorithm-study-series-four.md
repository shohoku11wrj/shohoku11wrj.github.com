---
layout: post
title: 磨刀不误砍柴工 系列之 四 &#58; Graph
category: Technology
tag: ['algorithm']
lan: EN
---

Terminology:

- __subgraph__ of graph G <br/>
A graph H whose vertices and edges are subsets of the vertices and edges of G.
- __spanning subgraph__ of graph G <br/>
A subgraph of G that contains all the vertices of the graph G.
- __connected__ graph <br/>
For any two vertices, there is a path between them.
- __froest__ <br/>
A graph without cycles.
- __tree__ <br/>
A connected forest, or a connected graph without cycles.

The definition of a tree is somewhat different from the one given in previous blogs. Previously, trees should be called __rooted trees__;in graph, trees should be called __free trees__.

Let G be an undirected graph with `\( n \)` vertices and `\( m \)` edges, then:

- If G is connected, then `\( m >= n - 1 \)`
- If G is a tree, then `\( m = n - 1 \)`
- If G is a forest, then `\( m <= n - 1 \)`

## Data Structures for Graphs

- edge list structure, `\( O(n + m) \)` space
- adjacency list structure, `\( O(n + m) \)` space
- adjacency matrix, `\( O(n^2) \)` space

To store the vertices, we use a container (eg: list or vector);
To store edges, there is difference between __edge/adjacency list__ and __adjacency matrix__. The former 2 structures only store the edges actually present in the graph, while the 3rd structure stores a placeholder for every pair of vertices.

### Edge List

The edge list structure is possibly the simplest, tough not the most efficient, representation of a graph G.

[picture of edge list]

### Adjacency List

The vertex object v holds a reference to a container `\( I(v) \)`, called the __incidence container__; or if directed dges, container `\( I_{in}(v), I_{out}(v) \)`; <br/>
The edge object for an edge (u,v) holds references to the positions of the edge in the incidence containters `\( I(u) \)` and `\( I(v) \)`.

[picture of adjacency list]

### Ajacency Matrix

Represent the graph G with an nxn array, A, such that A[i,j] stores a reference tot he edge (i,j), if such an edge exists. If there is no edge (i,j), then A[i,j] is null.

Historically, the adjacency matric was the first representation used for graphs, defined as a Boolean matrix, as follows:

`\[A[i,j] = \left\{\begin{matrix}
1 & if (i,j) is an edge \\ 
0 & otherwise
\end{matrix}\right.\]`

### DFS & BFS

    write the pesudo-code

## - Pseudo-code for Recurisve Depth-First Search

Back edges connect a vertex `\(v\)` to a previously visited vertex `\(u\)`, each back edge implies a cycle in G, consisting of the discovery edges from `\(u\)` to `\(v\)` plus the back edge (`\(u,v\)`)

__Algorithm__ DFS(G,`\(v\)`) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;
<i>__Input:__</i> A graph G and a vertex `\(v\)` of G <br/>
&nbsp;&nbsp;&nbsp;&nbsp;
<i>__Output:__</i> A labeling of the edges in the connected component of `\(v\)` as discovery edges and back edges <br/>
__for all__ edges `\(e\)` in G.incidentEdges(`\(v\)`) __do__ <br/>
&nbsp;&nbsp;&nbsp;&nbsp;
__if__ edge  `\(e\)` is unexplored __then__ <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
`\( w \leftarrow \)` G.opposite(`\( v,e \)`) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
__if__ vertex `\(w\)` is unexplored __then__ <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
label `\(e\)` as a discovery edge <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
recursively call DFS(G,`\(w\)`) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
__else__ </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
label `\(e\)` as a back edge


## - Pseudo-code for a nonrecursive BFS traversal

BFS proceeds in rounds and subdivides the vertices into __levels__. From those that lead to already visited vertices, called __cross edges__.




