import React, { Component } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import _ from "lodash";

const withFilterTable = WrappedComponente => {
  return class WithColumnTableSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: "",
      };
    }

    getFilterItemsProps = ({ dataIndex, dataSource = [], isFiltered = false, labels = null }) => {
      let filters = [];
      let filterData = [];
      if (!isFiltered && dataSource.length > 0) {
        filters = _.uniqBy(dataSource, dataIndex);
        for (const i of filters) {
          if (i[dataIndex]) {
            filterData.push({
              text: labels ? labels[i[dataIndex]] ?? "" : i[dataIndex] ?? "",
              value: labels ? i[dataIndex] ?? "" : i[dataIndex] ?? "",
            });
          }
        }
      }
      return {
        filters: filterData,
        onFilter: (value, record) => {
          return record[dataIndex] && String(record[dataIndex]).indexOf(value) === 0;
        },
      };
    };

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => this.searchInput = node}
            placeholder="Buscar"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            size="small"
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<i className="far fa-search gx-mr-2" />}
            style={{ width: 90, marginRight: 8 }}
          >
            Buscar
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => this.handleReset(clearFilters)}
          >
            Reiniciar
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? "#EC2008" : undefined }} />,
      onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => text && this.state.searchedColumn === dataIndex ? (
        <Highlighter
          autoEscape
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          textToHighlight={text.toString()}
        />
      ) : (text || "-"),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };

    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: "" });
    };

    render() {
      return (
        <WrappedComponente
          {...this.props}
          getColumnSearchProps={this.getColumnSearchProps}
          getFilterItemsProps={this.getFilterItemsProps}
        />
      );
    }
  };
};

export default withFilterTable;
