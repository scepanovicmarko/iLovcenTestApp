package com.lovcen.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Policy.
 */
@Entity
@Table(name = "policy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Policy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "policy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FieldGroup> fieldGroups = new HashSet<>();

    @OneToMany(mappedBy = "policy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Field> fields = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Policy name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<FieldGroup> getFieldGroups() {
        return fieldGroups;
    }

    public Policy fieldGroups(Set<FieldGroup> fieldGroups) {
        this.fieldGroups = fieldGroups;
        return this;
    }

    public Policy addFieldGroups(FieldGroup fieldGroup) {
        this.fieldGroups.add(fieldGroup);
        fieldGroup.setPolicy(this);
        return this;
    }

    public Policy removeFieldGroups(FieldGroup fieldGroup) {
        this.fieldGroups.remove(fieldGroup);
        fieldGroup.setPolicy(null);
        return this;
    }

    public void setFieldGroups(Set<FieldGroup> fieldGroups) {
        this.fieldGroups = fieldGroups;
    }

    public Set<Field> getFields() {
        return fields;
    }

    public Policy fields(Set<Field> fields) {
        this.fields = fields;
        return this;
    }

    public Policy addFields(Field field) {
        this.fields.add(field);
        field.setPolicy(this);
        return this;
    }

    public Policy removeFields(Field field) {
        this.fields.remove(field);
        field.setPolicy(null);
        return this;
    }

    public void setFields(Set<Field> fields) {
        this.fields = fields;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Policy)) {
            return false;
        }
        return id != null && id.equals(((Policy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Policy{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
