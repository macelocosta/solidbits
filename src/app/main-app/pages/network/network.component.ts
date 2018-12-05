import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { CardDataService } from '../../services/card-data.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor(private router: Router, private cardDataSvc:CardDataService) { }

  private treeData = {
    name: "UFC Quixadá",
    type: "location",
    status: 0,
    id: "0a3fgU",
    children: [
      {
        name: "Area de convivência",
        type: "location",
        status: 0,
        id:"9cFtbZ",
        children: [
          {
            name: "Lixeira 1",
            type: "bin",
            status: 0,
            id:"87cgad"
          },
        ]
      },
    ]
  }
  svg;
  lastStatus;

  ngOnInit() {
    this.cardDataSvc.network().subscribe(data => {
      this.treeData = data.children;
      this.lastStatus = data.status;
      this.draw();
    });
  }

  openNode(node_id) {
    this.router.navigate([`app/node/${node_id}`]);
  }

  draw() {
    let svg_ = document.querySelector("svg");
    if (svg_) {
      svg_.remove();
    }
    let margin = {top: 12, right: 12, bottom: 12, left: 12},
    // container_width = document.getElementById('main_container').offsetWidth - 24,
    // container_height = window.innerHeight - 136;

    container_width = 1000,
    container_height = 550;
    
    const WIDTH = container_width - 200;
    const HEIGHT = container_height - 100;
    
    this.svg = d3.select(".bin-view-container").append("svg")
        .attr("width", container_width)
        .attr("height", container_height)
        .append('g');
        // .attr('transform', 'translate(40,0)');
    
    const root = d3.hierarchy(this.treeData);
    const tree = d3.tree().size([HEIGHT, WIDTH]);
    
    tree(root);
    
    var link = this.svg.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d:any) {
          return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
        })
        .attr("stroke", function(d) {
          if (this.lastStatus == 0) {
            return "#8CC34B";
          } else if (this.lastStatus == 1) {
            return "#FE3517";
          } else {
            return "#8CC34B";
          }
        })
    
    var node = this.svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf") + " " + (d.data.type == "bin" ? "bin":"location")})
        .attr("transform", function(d:any) { return "translate(" + d.y + "," + d.x + ")"; })
        .attr("node_id", function(d:any) { return d.data.id });

    node.append("path")
        .attr("d", function(d) {
          if (d.data.type == "bin") {
            return `
            M 5, 5
            m -3, 0
            a 4,4 0 1,0 8,0
            a 4,4 0 1,0 -8,0`;
          } else {
            return `
            M 5, -5 
            h 20
            a 2, 2 0 0 1 2, 2
            v 5
            a 2, 2 0 0 1 -2, 2
            h -20
            a 2, 2 0 0 1 -2, -2
            v -5
            a 2, 2 0 0 1 2, -2
            z`;
          }
        })
        .attr("class", function(d) { return d.data.type == "bin" ? "bin":"location"})
        .attr("transform", function(d) {
          if (d.data.type == "bin"){
            return "translate(-5, -5)";
          } else {
            return "translate(-3, 0)";
          }
        }).attr("fill", function(d) {
          if (this.lastStatus == 0) {
            return "#8CC34B";
          } else if (this.lastStatus == 1) {
            return "#FE3517";
          } else {
            return "#8CC34B";
          }
        });

    node.append("rect")
        .attr("width", 40)
        .attr("height", 12)
        .attr("fill", "transparent")
        .attr("transform", function(d) {
          if (d.data.type == "bin"){
            return "translate(-5, -6)";
          } else {
            return "translate(-12, -6)";
          }
        });
    
    node.append("text")
        .attr("dy", 3)
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d:any) { return d.data.name; })
        .attr("transform", function(d) {
          if (d.data.type == "location" && !d.children){
            return "translate(16, 0)";
          }
        });

    let nodes = document.querySelectorAll('.node');

    for (let i = 0; i < nodes.length; i++) {
      // if (nodes[i].classList.contains('bin')) {
        nodes[i].addEventListener('click', ()=> {
          this.openNode('507f191e810c19729de860ea');
        });
      // }
    }
  }

//   <path 
//     d="
//     M cx cy
//     m -r, 0
//     a r,r 0 1,0 (r * 2),0
//     a r,r 0 1,0 -(r * 2),0
//     "
// />

}

